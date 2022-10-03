import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import ArtCard from '../components/ArtCard';
import { type SearchResults } from '../utils/interfaces';
import {ListProps} from '../utils/interfaces'

const List = (props: ListProps) => {

    if (props.results === undefined ) return <ul></ul>

    const renderRows = (results: SearchResults) => {
        return results.map(result => {
            return ( 
                <ImageListItem key={result.id}>
                    <ArtCard result={result} key={result.id}/>
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