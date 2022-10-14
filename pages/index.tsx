import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import FavortieIcon from '@mui/icons-material/Favorite'
import GitHubIcon from '@mui/icons-material/GitHub';

const Home: NextPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={1} sm={1} md={1} lg={2}></Grid>
            <Grid xs={10} sm={10} md={10} lg={6}>
                <Box sx={{margin: 'auto'}}>
                    <h1>Welcome to ArThief!</h1>
                    <p>
                        All artwork here is thanks to the Chicago Art Institute,
                        The Metropolitan Art Meuseam, and the Rijksmuseum. By using their 
                        public APIs, Artwork and metadata related to it was processd into a database.
                    </p>

                    <p>
                        This site allows for searches, likes, and eventually curations from that database. 
                        Users can see a list of their liked images on their acount page. The curation feature will be
                        available in the coming weeks 
                    </p>

                    <h1>Account</h1>
                    <p>
                        In order to like images, you will need an account. 
                        You sign up using an email, username, and password. 
                        You'll only need the username to login
                    </p>

                    <h1>Search</h1>
                    <p>
                        Use the search feature to find artworks. The search is based 
                        on art titles and artist names. You can click on a result to 
                        see it in the artwork view and "like" them. 

                        You don't need an account to use the search function, but you will in order to "like" artworks
                    </p>

                    <h1>Like</h1>
                    <p>
                        Once liked, you can go to your account and find a curation of your liked artwork.
                    </p>
                    <FavortieIcon color='error' />

                    <p>
                        You can find the Github repos here: <a href='https://github.com/campbellpadgett'><GitHubIcon fontSize='large' /></a>
                    </p>
                </Box>
            </Grid>
            <Grid xs={1} sm={1} md={1} lg={2}></Grid>
        </Grid>
    )
}

export default Home
