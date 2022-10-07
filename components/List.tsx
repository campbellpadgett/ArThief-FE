import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import ArtCard from '../components/ArtCard';
import { SearchResult } from '../utils/interfaces';

interface ListProps {
    results: SearchResult[] | undefined
    cols: number
}

const List = (props: ListProps) => {

    if (props.results === undefined ) return <ul></ul>

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
        <ImageList cols={props.cols}>
            {props.results !== null && renderRows(props.results)}
        </ImageList>
    )
}

export default List