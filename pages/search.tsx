import type { NextPage } from 'next'
import { useState, useMemo, useEffect } from "react"
import {TextField} from '@material-ui/core';
import Grid from '@mui/material/Unstable_Grid2';
import { debounce } from 'lodash';
import List from '../components/List'
import Loading from '../components/Loading';
import {api} from '../utils/keys'
import { preRenderSearch } from '../utils/preRenderFuncs';
import { SearchResult } from '../utils/interfaces'

 export const renderCols = (window: number): number => {
        if (window <= 600) return 1 
        if (window >= 601 && window <= 770) return 3

        return 4
    }

const Search: NextPage<{data: SearchResult[]}> = ({data}: {data: SearchResult[]}) => {

    const [input, setInput] = useState<string | null>(null)
    const [results, setResults] = useState<SearchResult[] | undefined>(undefined)
    const [sent, setSent] = useState(false)

    const fetchData = async (input: string | null) => {
        if (input === null) {
            setResults(data)
            setSent(true)
            return 
        }

        await fetch(`http://${api}/search/${input}`).then(async res => {
                const response: SearchResult[] = await res.json()
    
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
            <Grid xs={1} sm={1} md={1}></Grid>
            <Grid xs={10} sm={10} md={10}>
                <h1>Search</h1>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={deboucedSearchHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                        defaultValue={'van Gogh'}
                    />
                </div>
                <Grid container>
                    <Grid xs={1} sm={1} md={1}></Grid>
                    <Grid xs={10} sm={10} md={10}>
                       {results && sent ? <List results={results} cols={renderCols(window.innerWidth)} /> : <Loading />}
                    </Grid>
                    <Grid xs={1} sm={1} md={1}></Grid>
                </Grid>
                </Grid>
            <Grid xs={1} sm={1} md={1}></Grid>
        </Grid>
    )
}

export default Search

export async function getStaticProps() {
    const data = await preRenderSearch()

    return {
        props: { data }
    }
}