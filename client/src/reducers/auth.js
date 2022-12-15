import {AUTH, LOGOUT, UPDATE_USER_PROFILE } from '../constants/actionTypes';

const authReducer = (state = {authData : null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            // console.log({ authData: action?.data });
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        
        case UPDATE_USER_PROFILE:
            // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, userData: action.data };
        default:
            return state;
    }
}

export default authReducer;