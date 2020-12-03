import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PostActionTypes } from "./actionTypes/PostActionTypes";

const initialState = {
  isLoading: false,
  success: null,
  message: null,
  posts: [],
  post: null
};

const getPostsSuccess = (state, action) => {
  const sortedResults = action.result.sort((p1, p2) => p2.created_at >= p1.created_at ? 1 : -1);
  return {
    ...state,
    isLoading: false,
    posts: sortedResults
  };
};

const getPostSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    post: action.result
  };
}

const savedPostSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    success: true,
    message: null,
    post: action.result.data
  };
}

const updateIsLoading = (state, action) => {
  console.log("Is Loading: ", action.result);
  return {
    ...state,
    isLoading: true
  };
}

function rootReducer(state, action) {
  switch (action.type) {
    case PostActionTypes.GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case PostActionTypes.GET_POST_SUCCESS:
      return getPostSuccess(state, action);
    case PostActionTypes.CREATE_POST_SUCCESS:
      return savedPostSuccess(state, action);
    case PostActionTypes.IS_LOADING:
      return updateIsLoading(state, action);
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  return store;
};