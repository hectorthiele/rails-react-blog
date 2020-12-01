import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PostActionTypes } from "./actionTypes/PostActionTypes";

const initialState = {
  posts: [],
  post: null,
};

const getPostsSuccess = (state, action) => {
  return {
    ...state,
    posts: action.result
  };
};

const getPostSuccess = (state, action) => {
  return {
    ...state,
    post: action.result
  };
}

function rootReducer (state, action) {
  console.log("Action: ", action);
  console.log("State: ", state);
  switch (action.type) {
    case PostActionTypes.GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case PostActionTypes.GET_POST_SUCCESS:
      return getPostSuccess(state, action);
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