import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Constants/constants'
import { signupAPI, loginAPI } from '../../APIs/apiCalls';

export const signupAction = (firstName, lastName, email, phone, password) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });
        signupAPI(firstName, lastName, email, phone, password).then((data) => {
            dispatch({
                type: SIGNUP_SUCCESS, payload: data.data
            })
        })
    } catch (error) {
        dispatch({
            type: SIGNUP_FAILURE,
            payload: error.response && error.response.message ?
                error.response.message : error.response.data
        })
        console.log(error.response.data);
    }
}


export const loginAction = (email, password) => async (dispatch) => {
    console.log(email, password, 'inside userActionsssssssssssssssssss');
    try {
        dispatch({ type: LOGIN_REQUEST });
        loginAPI(email, password).then((data) => {
            dispatch({
                type: LOGIN_SUCCESS, payload: data.data
            })
            localStorage.setItem("userData", JSON.stringify(data.data))
            window.location.reload()
        }).catch((error)=>{
            dispatch({
                type: LOGIN_FAILURE,
                payload: error.response && error.response.message ?
                    error.response.message : error.response.data
            })
        })
    } catch (error) {
        console.log(error,'error loading user');  
    }
}

