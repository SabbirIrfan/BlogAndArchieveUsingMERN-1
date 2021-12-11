import { GET_USER_BY_ID } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUserById = (id,setUserProfileData) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    console.log("Hi in the action")
    const temp = await api.getUsersById(id);
    // console.log("Hi")
    const { data } = temp;
    // console.log(data)
    dispatch({ type: GET_USER_BY_ID, payload: { userData: data } });
    // console.log("hi in the action")
    // console.log(data)
    setUserProfileData(data)
  } catch (error) {
    console.log(error);
  }
};
