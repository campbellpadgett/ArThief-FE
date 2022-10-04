import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import LoginForm from '../components/forms/LoginForm'


const Login: NextPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={1} sm={1} md={2} lg={2}></Grid>
            <Grid xs={10} sm={10} md={7} lg={7}>
                <h1>Login</h1>
                <LoginForm />
            </Grid>
            <Grid xs={1} sm={1} md={3} lg={3}></Grid>
        </Grid>
    )
}

export default Login