import { Alert, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../atoms/userAtoms';
import { UserData } from '../../utils/checkUser';
import {api, local} from '../../utils/keys'

interface LoginData {
    password: null | string
    username: null | string 
}

const LoginForm = () => {

    const [data, setData] = useState<LoginData>({username: null, password: null})
    const setUserData = useSetRecoilState(userDataAtom)
    const [error, setError] = useState(false)

    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value
        setData(data => {
            return {...data, username: username}
        })
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwd = e.target.value
        setData(data => {
            return {...data, password: pwd}
        })
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch(`http://${api}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        const userData: UserData = await res.json()

        if (res.status === 200) {
            setUserData(userData)
            Router.push(`search`)
        }
        if (res.status === 404 || res.status === 400) setError(true)
    }

    return (

        <form onSubmit={loginHandler}>
            <Grid container spacing={1}>
                <Grid>
                    <TextField
                    onChange={usernameHandler}
                    sx={{width: '20vw'}}
                    id="outlined-required"
                    label={"Username"}
                    type="username"
                    required
                    />
                </Grid>
                <Grid>
                    <TextField
                    onChange={passwordHandler}
                    sx={{width: '20vw'}}
                    id="outlined-password-input"
                    label={"Password"}
                    type="password"
                    required
                    />
                </Grid>

                {error && 
                <Grid>
                    <Alert severity="error">Username or Password wrong</Alert>
                </Grid>
                }
            </Grid>

            <br />

            <Button type="submit" variant='contained' color='primary'>
                Login
            </Button>
        </form>

    )    
}


export default LoginForm 