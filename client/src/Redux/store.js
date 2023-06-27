import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { LoginReducer, SignupReducer } from './Reducers/reducers'

const rootReducer = combineReducers({
  signup: SignupReducer,
  login: LoginReducer
});

let userData = JSON.parse(localStorage.getItem('userData'))


const initialState = {
  userLogin: { userLoginDetails: userData },
};


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, initialState, composedEnhancer)

export default store
