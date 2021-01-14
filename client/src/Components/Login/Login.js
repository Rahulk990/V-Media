import React from 'react'
import { useDispatch } from 'react-redux'
import './Login.css'

import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase'
import { login } from '../ReduxStore/appSlice'

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch(login({
                    userId: '5ffebe029b50ff28646bdb81',
                    username: result.user.displayName,
                    avatarSrc: result.user.photoURL
                }))
            })
            .catch(err => console.log(err.message))
        history.replace('/home')
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
