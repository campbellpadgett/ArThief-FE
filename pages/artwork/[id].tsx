import { useRouter } from "next/router";
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import LikeButton from "../../components/LikeButton";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../../atoms/userAtoms";
import { useState, useEffect, useMemo } from 'react'
import { GetServerSideProps, NextPage } from "next";
import { LikeData, SearchResult } from "../../utils/interfaces";
import { debounce } from "lodash";
import { preRenderArtwork } from "../../utils/preRenderFuncs";
import { rowSX, renderSource, likeHandler, imgSize, likeReq } from '../../utils/artworkMethods'

const Artwork: NextPage<{data: SearchResult}> = ({data}: {data: SearchResult}) => {
    const router = useRouter()
    const artworkID = router.query.id as string | undefined

    const user = useRecoilValue(userDataAtom)
    const likeData: LikeData = {itemID: artworkID, userID: user?.ID, likeStatus: false}

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
                        image={data.IMG}
                        alt={`image titled: ${data.Title}`}
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
                <h1>{data.Title}</h1>
                <h2>By {data.Artist_Name}</h2>
                <p>Released in {data.DOR}</p>
                <p>{
                    renderSource(data.Source as string, data.Abb as string)
                }</p>
                </Grid>
                <Grid md={2} />
            </Grid>
        </div>
    )
}

export default Artwork

export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params?.id
    const res = await preRenderArtwork(id as string)

    return {
        props: {data: res}
    }
}