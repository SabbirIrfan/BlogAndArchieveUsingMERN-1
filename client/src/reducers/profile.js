import {GET_USER_BY_ID} from '../constants/actionTypes';

const profileReducer = (state = {userData : null}, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            // console.log(action?.data)
            return { ...state, userData: action.data };
        default:
            return state;
    }
}

export default profileReducer;
