import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE || 'http://localhost:8000'
})

export default instance