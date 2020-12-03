import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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

        if (!this.props.post) {
            if (this.props.isLoading) {
                return (<Loading />);
            }
        }

        let { post } = this.props;
        return (
            <div className='posts-listing'>
                <div className='container'>
                    <div className="post-details">
                        <div className='post-meta d-flex justify-content-between'>
                            <div className='date meta-last'> {formatDateTime(post.created_at)} </div>
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
    post: state => state.post
});

const mapDispatchToProps = dispatch => ({
    getPost: (id) => {
        dispatch(PostActions.getPost(id))
    }
});
export default connect(structuredSelector, mapDispatchToProps)(PostDetailView);