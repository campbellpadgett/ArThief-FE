import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import ArtCard from '../components/ArtCard';
import { SearchResult } from '../utils/interfaces';
import {useState, useMemo, useEffect} from 'react'
import { debounce } from 'lodash';
import Loading from './Loading';
import { LikedListRes } from '../utils/interfaces';
import { renderSize } from '../pages/search';

export interface LikedProps {
    data: LikedListRes
}

const LikedArtworks = (props: LikedProps) => {

    const [screenSize, setScreenSize] = useState<number>(576)
    
    const resize = () => setScreenSize(window.innerWidth)
    const handleResize = useMemo(() => debounce(resize, 100), [])

    useEffect(() => {
        setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })



    const renderRows = (results: SearchResult[]) => {
        return results.map(result => {
            return ( 
                <ImageListItem key={result.id}>
                    <ArtCard result={result} cardSize={400} key={result.id}/>
                </ImageListItem>
            )
        })
    }

    return ( 
        <ImageList cols={renderSize(screenSize)}>
            {props.data.liked_artwork ? renderRows(props.data.liked_artwork) : <Loading />}
        </ImageList>
    )
}

export default LikedArtworks