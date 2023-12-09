import * as api from "../../api/index";
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE_POST,
  UPDATE_POST,
} from "../actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    console.log(data)
    dispatch({
      type: FETCH_ALL,
      payload: {
        posts: data.data,
        NumberOfPages: data.numberOfPages,
        currentPage: data.currentPage
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: { post: data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE_POST, payload: { post: data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: { id } });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data: updatedPost } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: { id, post: updatedPost } });
  } catch (error) {
    console.log(error.message);
  }
};
