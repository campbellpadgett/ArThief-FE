import { Alert, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Router from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../atoms/userAtoms';
import { UserData } from '../../utils/checkUser';
import {api} from '../../utils/keys'
import { LoginData } from '../../utils/interfaces';
import styles from '../../styles/Navbar.module.css'

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
        if (res.status >= 400 || res.headers.get('error') === 'true') setError(true)
    }

    return (

        <form onSubmit={loginHandler}>
            <Grid container spacing={2}>
                <Grid xs={11} sm={11} md={6} lg={9} className={styles.input}>
                    <TextField
                    onChange={usernameHandler}
                    sx={{width: '100%'}}
                    id="outlined-required"
                    label={"Username"}
                    type="username"
                    required
                    />
                </Grid>
                <Grid xs={11} sm={11} md={6} lg={9} className={styles.input}>
                    <TextField
                    onChange={passwordHandler}
                    sx={{width: '100%'}}
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