import { useRouter } from "next/router";
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import LikeButton from "../../components/LikeButton";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../../atoms/userAtoms";
import { Dispatch, SetStateAction, useState, useEffect, useMemo } from 'react'
import { NextPage } from "next";
import {api} from '../../utils/keys'
import { LikeData, LikeRequest } from "../../utils/interfaces";
import { debounce } from "lodash";

const rowSX = {
    padding: '2px',
    borderTop: '5px solid black' 
}

const renderSource = (source: string, Abb: string) => {
    if (Abb === 'CHI') return `Courtesy of the ${source} from the Art Institute of Chicago`
    
    return `Courtesy of the ${source}`
}

const likeHandler = async (likedStatus: boolean, setStatus: Dispatch<SetStateAction<boolean>>, likeData: LikeData) => {
    setStatus(!likedStatus)

    const ld: LikeData = {
        itemID: likeData.itemID,
        userID: likeData.userID,
        likeStatus: !likedStatus
    }

    const res = await fetch(`http://${api}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ld)
        })
}

const imgSize = (window: number) => {
    if (window >= 1000) return '50%'
    if (window <= 999 && window > 425) return '75%'
    if (window <= 424) return '100%'
}

const Artwork: NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const artworkID = query.id as string | undefined
    const user = useRecoilValue(userDataAtom)
    const likeData: LikeData = {itemID: artworkID, userID: user?.ID, likeStatus: false}

    const likeReq = async (ld: LikeData): Promise<LikeRequest | undefined> => {
        const res = await fetch(`http://${api}/likes`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ld)
        }) 
        
        const currentLikeData: LikeRequest = await res.json()
        return currentLikeData
    }

    const [screenSize, setScreenSize] = useState<number>(576)
    const resize = () => setScreenSize(window.innerWidth)
    const handleResize = useMemo(() => debounce(resize, 100), [])

    useEffect(() => {
        setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <div>
            <br />
            <Grid container spacing={1}>
                <Grid xs={2} sm={2} md={2} />
                <Grid xs={8} sm={8} md={8}>
                    <Card sx={{ maxWidth: imgSize(screenSize), margin: 'auto' }}>
                        <CardMedia
                        component="img"
                        // @ts-ignore
                        image={query.IMG}
                        alt={`image titled: ${query.Title}`}
                        />
                    </Card>

                    {user && <LikeButton likeData={likeData} likeHandler={likeHandler} likeReq={likeReq} />}
                </Grid>
                <Grid xs={2} sm={2} md={2} />
            </Grid>

            <br />

            <Grid container spacing={1}>
                <Grid xs={2} sm={2} md={2} />
                <Grid xs={8} sm={8} md={8} sx={rowSX}>
                <h1>{query.Title}</h1>
                <h2>By {query.Artist_Name}</h2>
                <p>Released in {query.DOR}</p>
                <p>{
                    renderSource(query.Source as string, query.Abb as string)
                }</p>
                </Grid>
                <Grid md={2} />
            </Grid>
        </div>
    )
}

export default Artwork