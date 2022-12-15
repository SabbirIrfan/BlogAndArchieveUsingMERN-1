import { START_LOADING,COMMENT,  END_LOADING, FETCH_ALL,UPDATE_CONTRIBUTE, FETCH_CONTRIBUTION_BY_ID, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE,FETCH_SINGLE_USER_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
  
    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    // console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data }  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log(post);
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({ type: CREATE, payload: data });

    history(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log(data)
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

///
export const updateContribute = (id, contributeddata) => async (dispatch) => {
  try {
    // console.log(contributeddata)
    const { data } = await api.updateContribute(id, contributeddata);
    // console.log(data)
    dispatch({ type: UPDATE_CONTRIBUTE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getContributionByPostId = (id, setContributedSinglePostData) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.fetchContributionByPostId(id);
    // console.log(data)
    setContributedSinglePostData(data);

    // let allContribution = []
    // data.forEach(element => {
    //   const temp_id = element._id;
    //   console.log(temp_id)
    //   const userD = api.getIndividulaContributionById(temp_id);
    //         allContribution.push(userD)
    // });
    // console.log(allContribution)
    // dispatch({ type: FETCH_CONTRIBUTION_BY_ID, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
}


export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};


export const getSingleUserPosts = ( id, setAllPosts) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchSingleUserPosts(id);
    setAllPosts(data)
    dispatch({ type: FETCH_SINGLE_USER_ALL, payload: { data} });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};