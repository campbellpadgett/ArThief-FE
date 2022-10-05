import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import Router from 'next/router';
import {api, local} from '../../utils/keys'
import {FormProps, SignUpData} from '../../utils/interfaces'

const SignUpForm = (props: FormProps) => {

    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [data, setData] = useState<SignUpData>({email: null, username: null, password: null})

    const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setInvalidEmail(false)
            setData(data => {
                return {...data, email: email}
            })
        }

        else setInvalidEmail(true)
    }
    
    const deboucedEmailValidator = useMemo(() => debounce(checkEmail, 350), [])

    const checkUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value
        if (!props.usernames[username] && username.length >= 4) {
            setInvalidUsername(false)
            setData(data => {
                return {...data, username: username}
            })
        }
        
        else setInvalidUsername(true)
    }
    
    const deboucedUsernameValidator = useMemo(() => debounce(checkUsername, 350), [props.usernames])

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwd = e.target.value
        if (pwd.length >= 8) {
            setInvalidPassword(false)
            setData(data => {
                return {...data, password: pwd}
            })
        }

        else setInvalidPassword(true)
    }
    
    const deboucedPwdValidator = useMemo(() => debounce(checkPassword, 350), [])

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await fetch(`http://${api}/sign-up`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        Router.push(`http://${local}/login`)
    }

    return (
    

        <form onSubmit={submitHandler}>
            <Grid container spacing={1}>
                <Grid xs={11} sm={11} md={6} lg={9}>
                    <TextField
                    onChange={deboucedEmailValidator}
                    sx={{width: '100%'}}
                    error={invalidEmail}
                    id="outlined-required"
                    label={invalidEmail ? "Email is invalid" : "Email"}
                    type="email"
                    required
                    />
                </Grid>
                <Grid xs={11} sm={11} md={6} lg={9}>
                    <TextField
                    onChange={deboucedUsernameValidator}
                    sx={{width: '100%'}}
                    error={invalidUsername}
                    id="outlined-required"
                    label={invalidUsername ? "That username is taken" : "Username (4 Character Min)"}
                    type="username"
                    required
                    />
                </Grid>
                <Grid xs={11} sm={11} md={6} lg={9}>
                    <TextField
                    onChange={deboucedPwdValidator}
                    sx={{width: '100%'}}
                    error={invalidPassword}
                    id="outlined-password-input"
                    label={invalidPassword ? "Not enough charecters" : "Password"}
                    type="password"
                    required
                    />
                </Grid>
            </Grid>

            <br />

            <Button type="submit" variant='contained' color='success'>
                Submit
            </Button>
        </form>

    )    
}


export default SignUpForm 