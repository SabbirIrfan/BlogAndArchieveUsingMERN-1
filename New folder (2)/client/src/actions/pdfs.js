import { START_LOADING,COMMENT,  END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE,FETCH_SINGLE_USER_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getallpdfs = (setAllpdfs) => async (dispatch) => {
    try {
      const  data = await api.fetchAllpdfs();
      // console.log(data);
      setAllpdfs(data.data);
    //   dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    //   dispatch({ type: END_LOADING });
    // console.log(data);
    } catch (error) {
        console.log("here");
      console.log(error);
    }

  };

  export const addnewReasources = (useFiles) => async (dispatch) => {
    try {
      const { data } = await api.addnewReasources(useFiles);
      // console.log(data);
    //   dispatch({ type: CREATE, payload: data });
  
    //   history(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deletePDF = (id) => async (dispatch) => {
    try {
      await api.deletePdf(id);
    console.log("Deleted?");
    
      // dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };