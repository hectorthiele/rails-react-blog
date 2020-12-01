import URLResolver from '../../utils/URLResolver';
import { PostActionTypes } from '../actionTypes/PostActionTypes';

const getPostsSuccess = results => ({
	type: PostActionTypes.GET_POSTS_SUCCESS,
	result: results
});

const getPostSuccess = post => ({
	type: PostActionTypes.GET_POST_SUCCESS,
	result: post
});

const PostActions = {

	getPosts: () => (dispatch) => {
		const url = `${URLResolver.posts}`;
		return fetch(url)
			.then(response => response.json())
			.then(data => dispatch(getPostsSuccess(data)));
	},

	getPost: (post_id) => (dispatch) => {
		const url = `${URLResolver.posts}/${post_id}`;
		return fetch(url)
			.then(response => response.json())
			.then(post => dispatch(getPostSuccess(post)));
	}
};

export default PostActions;