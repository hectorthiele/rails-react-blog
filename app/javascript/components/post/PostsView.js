import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PostActions from '../redux/actions/PostActions';

//custom components
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PostItem from './PostItem';

class PostsView extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
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
    posts: state => state.posts
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => {
        dispatch(PostActions.getPosts())
    }
});
export default connect(structuredSelector, mapDispatchToProps)(PostsView);