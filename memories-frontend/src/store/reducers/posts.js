import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  LOGOUT,
  FETCH_BY_SEARCH,
} from "../actionTypes";

const postsReducer = (
  state = { posts: [], currentPage: 1, NumberOfPages: 1 },
  action
) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        NumberOfPages: action.payload.NumberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.posts };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload.post] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => action.payload.id !== post._id),
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? action.payload.post : post
        ),
      };
    case LOGOUT:
      return { ...state, posts: state.posts.filter((post) => !post.private) };
    default:
      return state;
  }
};

export default postsReducer;
