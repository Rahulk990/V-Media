import React from 'react'
import './Login.css'

import { Button } from '@material-ui/core'
import createUser from './API/createUser'

const Login = () => {

    const signInHandler = async () => {
        await createUser()
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg'
                    alt='LogoImage'
                />
                <Button variant='outlined' onClick={signInHandler}>
                    Sign In
            </Button>
            </div>
        </div>
    )
}

export default Login
