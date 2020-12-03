import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loading from '../layout/Loading';


import PostActions from '../redux/actions/PostActions';
//custom components
import PostItem from './PostItem';

class PostsView extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading />
            )
        }

        const { posts } = this.props;
        const postList = posts.map((post, index) => {
            return <PostItem key={index} post={post} />
        })

        return (
            <div className='posts-listing'>
                <div className='container'>
                    <div className='row'>
                        {postList}
                    </div>
                </div>
            </div>
        );
    };
};

const structuredSelector = createStructuredSelector({
    posts: state => state.posts,
    isLoading: state => state.isLoading
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => {
        dispatch(PostActions.getPosts())
    }
});
export default connect(structuredSelector, mapDispatchToProps)(PostsView);