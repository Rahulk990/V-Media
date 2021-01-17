import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Login.css'

import { Button } from '@material-ui/core'
import createUser from '../API/createUser'
import checkAuth from './checkAuth'

const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        checkAuth(dispatch, history);
    }, [])

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
