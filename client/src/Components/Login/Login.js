import React from 'react'
import { useDispatch } from 'react-redux'
import './Login.css'

import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase'
import { login } from '../ReduxStore/appSlice'
import axios from '../Misc/axios'

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const signIn = async () => {
        await auth.signInWithPopup(provider)
            .then(result => {
                const userData = {
                    userId: result.user.uid,
                    name: result.user.displayName,
                    avatar: result.user.photoURL,
                    email: result.user.email
                }
                saveData(userData)
            })
            .catch(err => console.log(err.message))

        history.replace('/home')
    }

    const saveData = async (userData) => {
        await axios.post('/upload/user', userData)
            .then((res) => {
                // console.log(res)
            })
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
