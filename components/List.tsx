import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import ArtCard from '../components/ArtCard';
import { type SearchResults } from '../pages/search';

interface ListProps {
    input: string
    results: SearchResults | undefined
}

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
        <ImageList cols={4}>
            {props.results !== null && renderRows(props.results)}
        </ImageList>
    )
}

export default List