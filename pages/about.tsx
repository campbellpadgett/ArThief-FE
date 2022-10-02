import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import FavortieIcon from '@mui/icons-material/Favorite'

const Login: NextPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={2} sm={2} md={2} lg={2}></Grid>
            <Grid xs={10} sm={10} md={10} lg={8}>
                <Box sx={{margin: 'auto'}}>
                    <h1>About</h1>
                    <p>
                        All artwork here is thanks to the Chicago Art Institute,
                        The Metropolitan Art Meuseam, and the Rijksmuseum 
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
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login