import {START_LOADING,END_LOADING,FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH,CREATE, UPDATE,LIKE, DELETE,} from '../constants/actionTypes.js';
import * as api from '../api/index';

//Action Creators
export const getPost = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api .fetchPost(id);


    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    console.log(data);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: {data}  });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    // console.log(post);
    const { data } = await api.createPost(post);
    console.log(data)
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
     console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// export const likePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: UPDATE, payload: data });

//   } catch (error) {
//     console.log(error.message);
//   }

// };

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    console.log("do you rally want to delete the post");
  } catch (error) {
    console.log(error.message); 
  }
};
