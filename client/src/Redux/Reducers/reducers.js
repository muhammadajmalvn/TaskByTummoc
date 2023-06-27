import {SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../Constants/constants'


export const SignupReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return { loading: true }
        case SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case SIGNUP_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true }
        case LOGIN_SUCCESS:
            return { loading: false, userLoginDetails: action.payload }
        case LOGIN_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}