import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';

import PostActions from '../redux/actions/PostActions';

//custom components
import { formatDateTime } from "../utils/DateFormatter";

class PostDetailView extends Component {

    componentDidMount() {
        let { id } = this.props.match.params;
        if (id) {
            this.props.getPost(id);
        }
    }

    render() {

        if (!this.props.post || this.props.isLoading) {
            return (<Loading />);
        }

        let { post } = this.props;
        return (
            <div className='posts-listing'>
                <div className='container'>
                    <div className="post-details">
                        <div className='post-meta d-flex justify-content-between'>
                            <div className='date meta-last'> {formatDateTime(post.created_at)} </div>
                            <div className='category'>
                                <Link className={'btn btn-default'} to={`/posts/${post.id}/edit`}>Edit Post</Link>
                            </div>
                        </div>
                        <h3>{post.title}</h3>
                        <p> {post.content}</p>
                    </div>
                </div>
            </div>
        );
    };
};

const structuredSelector = createStructuredSelector({
    post: state => state.post,
    isLoading: state => state.isLoading
});

const mapDispatchToProps = dispatch => ({
    getPost: (id) => {
        dispatch(PostActions.getPost(id))
    }
});
export default connect(structuredSelector, mapDispatchToProps)(PostDetailView);