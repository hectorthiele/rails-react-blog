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

const isLoading = (isLoading) => ({
	type: PostActionTypes.IS_LOADING,
	result: isLoading
});

const savedPostSuccess = (post) => ({
	type: PostActionTypes.CREATE_POST_SUCCESS,
	result: post
});


const PostActions = {

	getPosts: () => (dispatch) => {
		const url = `${URLResolver.posts.index}`;
		dispatch(isLoading(true));
		return fetch(url)
			.then(response => response.json())
			.then(data => dispatch(getPostsSuccess(data)));
	},

	getPost: (post_id) => (dispatch) => {
		const url = `${URLResolver.posts.show}/${post_id}`;
		return fetch(url)
			.then(response => response.json())
			.then(post => dispatch(getPostSuccess(post)));
	},

	savePost: (post) => (dispatch) => {

		let formData = new FormData();
		for (var name in post) {
			formData.append(name, post[name]);
		}

		const url = `${URLResolver.posts.create}`;

		// Start the loading
		dispatch(isLoading(true));
		return fetch(url, {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(post => {
				dispatch(savedPostSuccess(post));
			});
	}
};

export default PostActions;