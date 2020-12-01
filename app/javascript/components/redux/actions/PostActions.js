import URLResolver from '../../utils/URLResolver';
import { PostActionTypes } from '../actionTypes/PostActionTypes';

const getPostSuccess = results => ({
    type: PostActionTypes.GET_POSTS_SUCCESS,
    result: results
});

const PostActions = {

    getPosts: () => (dispatch) => {
        const url = `${URLResolver.posts}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => dispatch(getPostSuccess(data)));
    }
};

export default PostActions;