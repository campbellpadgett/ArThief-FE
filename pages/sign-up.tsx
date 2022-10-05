import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import SignUpForm from '../components/forms/SignUpForm';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {api} from '../utils/keys'
import { TakenUsernames } from '../utils/interfaces';

const SignUp: NextPage = () => {

    const [usernames, setUsernames] = useState<TakenUsernames>({})

    const fetchUsernameData = async () => {
        await fetch(`http://${api}/usernames`).then(async res => {
                const response: TakenUsernames = await res.json()
                setUsernames(response)
        })
    }

    useEffect(() => {
        fetchUsernameData()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid xs={1} sm={1} md={2} lg={2}></Grid>
            <Grid xs={10} sm={10} md={7} lg={7}>
                <h1>Create Account</h1>
                <SignUpForm usernames={usernames} />
            </Grid>
            <Grid xs={1} sm={1} md={3} lg={3}></Grid>
        </Grid>
    )
}

export default SignUp