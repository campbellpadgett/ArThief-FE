import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import SignUpForm from '../components/forms/SignUpForm';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';




export interface TakenUsernames { 
    [key: string]: boolean
}

const SignUp: NextPage = () => {

    const [usernames, setUsernames] = useState<TakenUsernames>({})

    const fetchUsernameData = async () => {
        await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL}/usernames`).then(async res => {
                const response: TakenUsernames = await res.json()
                setUsernames(response)
        })
    }

    useEffect(() => {
        fetchUsernameData()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid sm={4} md={4} lg={4}></Grid>
            <Grid sm={4} md={4} lg={4}>
                <Box sx={{margin: 'auto'}}>
                    <h1>Create Account</h1>
                    <SignUpForm usernames={usernames} />
                </Box>
            </Grid>
            <Grid sm={4} md={4} lg={4}></Grid>
        </Grid>
    )
}

export default SignUp