import { Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'

const Login = () => {

    const history = useHistory();
    history.replace('/login')

    const signIn = () => {

    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg'
                    alt='LogoImage'
                />
                <Button variant='outlined' onClick={signIn}>
                    Sign In
            </Button>
            </div>
        </div>
    )
}

export default Login
