import axios from 'axios'
const API = axios.create({ baseURL: "http://localhost:5000" })
const user = JSON.parse(localStorage.getItem('userData'))
const ID = user?.id
const config = {
    headers: {
        "Content-Type": "application/json",
    }
}
const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.token
    }
}

export const signupAPI = (firstName, lastName, email, phone, password ) => API.post('/signup', { firstName, lastName, email, phone, password }, config)
export const loginAPI = (email,password)=>API.post('/login', { email, password }, config)
export const cityaddAPI = (cityData)=>API.post('/city',{cityData},configToken)
export const fetchCitiesAPI= () =>API.get('/cities?id='+ID,configToken)