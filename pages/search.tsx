import type { NextPage } from 'next'
import { useState, useMemo, useEffect } from "react"
import {TextField} from '@material-ui/core';
import Grid from '@mui/material/Unstable_Grid2';
import { debounce } from 'lodash';
import List from '../components/List'
import Loading from '../components/Loading';
import {api} from '../utils/keys'


export type SearchResults = {
    id: string
    Title: string
    Artist_Name: string
    DOR: string
    Description: string
    Source: string
    Abb: string
    IMG: string
    IMG_S: string | null 
}[]

const Search: NextPage = () => {

    const [input, setInput] = useState('Gogh')
    const [results, setResults] = useState<SearchResults | undefined>(undefined)
    const [sent, setSent] = useState(false)

    const fetchData = async (input: string) => {
        await fetch(`http://${api}/search/${input}`).then(async res => {
                const response: SearchResults = await res.json()
    
                setResults(response)
                setSent(true)
        })
    }

    useEffect(() => {
        fetchData(input)
    }, [input])

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target !== null && e.target.value !== '') setInput(e.target.value.toLowerCase())

        if (e.target.value === '') return
    }

    const deboucedSearchHandler = useMemo(() => debounce(searchHandler, 500), [])

    return (
        <Grid container spacing={2}>
            <Grid md={1}></Grid>
            <Grid md={10}>
                <h1>Search</h1>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={deboucedSearchHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <Grid container>
                    <Grid md={1}></Grid>
                    <Grid md={10}>
                       {results && sent ? <List input={input} results={results} /> : <Loading />}
                    </Grid>
                    <Grid md={1}></Grid>
                </Grid>
                </Grid>
            <Grid md={1}></Grid>
        </Grid>
    )
}

export default Search