import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import LoginForm from '../components/forms/LoginForm'


const Login: NextPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid sm={4} md={4} lg={4}></Grid>
            <Grid sm={4} md={4} lg={4}>
                <Box sx={{margin: 'auto'}}>
                    <h1>Login</h1>
                    <LoginForm />
                </Box>
            </Grid>
            <Grid sm={4} md={4} lg={4}></Grid>
        </Grid>
    )
}

export default Login