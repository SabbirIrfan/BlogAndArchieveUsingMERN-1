import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';


// SIGN UP ACTION
export const signup = (formData, navigate,setUserId) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        // console.log(data) 
        dispatch({ type: AUTH, data })
        setUserId("SignUp")
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

//SIGN IN ACTION
export const signin = (formData, navigate, setUserId) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        // console.log(data)
        dispatch({ type: AUTH, data })
        setUserId("SignIn")
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

