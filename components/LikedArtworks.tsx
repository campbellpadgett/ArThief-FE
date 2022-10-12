import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import ArtCard from '../components/ArtCard';
import { SearchResult } from '../utils/interfaces';
import {useState, useMemo, useEffect} from 'react'
import { debounce, result } from 'lodash';
import Loading from './Loading';
import { LikedListRes } from '../utils/interfaces';
import { renderSize } from '../pages/search';
import { Button } from "@mui/material"
import { getLikedArtwork } from '../utils/preRenderFuncs';

export interface LikedProps {
    data: LikedListRes
    userID: string
}

const LikedArtworks = (props: LikedProps) => {

    console.log('count', props.data.count)

    const [screenSize, setScreenSize] = useState<number>(576)
    const [likedData, setLikedData] = useState<LikedListRes | undefined>(props.data)
    
    const resize = () => setScreenSize(window.innerWidth)
    const handleResize = useMemo(() => debounce(resize, 100), [])

    useEffect(() => {
        setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    const nextPage = async () => {
        const data = await getLikedArtwork(props.userID, likedData?.page)

        setLikedData(data)
    }



    const renderRows = (results: SearchResult[] | undefined) => {

        if (results === undefined) return <h3>No Liked Images</h3>

        return results.map(result => {
            return ( 
                <ImageListItem key={result.id}>
                    <ArtCard result={result} cardSize={400} realtiveURL={false} key={result.id}/>
                </ImageListItem>
            )
        })
    }

    return ( 
        <>
            <ImageList cols={renderSize(screenSize)}>
                {likedData && likedData.liked_artwork ? renderRows(likedData.liked_artwork) : <Loading />}
            </ImageList>

            {likedData && likedData?.count >= 11 ?
                 <Button onClick={() => nextPage()} variant='contained' color='success'>Next 10</Button>
             : null}
        </>
    )
}

export default LikedArtworks