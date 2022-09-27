import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link'

export type SearchResult = {
    id: string
    Title: string
    Artist_Name: string
    DOR: string
    Description: string
    Source: string
    Abb: string
    IMG: string
    IMG_S: string | null
}

interface ArtCardProps {
    result: SearchResult
}

const provideImage = (result: SearchResult): string => {
    if (result.IMG_S !== null && result.IMG_S !== '') return result.IMG_S

    return result.IMG
}

const ArtCard = (props: ArtCardProps) => {

    return (
        <>
            <Box sx={{maxWidth: 400, padding: 1}}>
                <Link href={{pathname:`artwork/${props.result.id}`, query: props.result}}>
                    <Card>
                        <CardActionArea>
                            <CardContent>

                                <CardMedia
                                component="img"
                                // height="140"
                                src={provideImage(props.result)}
                                alt="image not found"
                                />

                                <Typography variant="h5" component="div">
                                        <a>{props.result.Title}</a>
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    By {props.result.Artist_Name}
                                </Typography>

                                <Typography variant="body2">
                                    {props.result.Description}
                                </Typography>

                            </CardContent>
                        </CardActionArea> 
                    </Card>
                </Link>
            </Box>
        </>
    )
}

export default ArtCard