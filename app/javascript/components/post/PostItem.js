import React from "react";
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/DateFormatter';

const PostItem = (props) => {
    const { post } = props;
    return (
        <div className="post col-xl-12" >
            {/*<div className='post-thumbnail'>*/}
            {/*    <img className="card-img-top" src="../../images/blog-3.jpg" alt="Post"/>*/}
            {/*</div>*/}
            <div className='card'>
                <div className="card-body">
                    <div className="post-details">
                        <div className='post-meta d-flex justify-content-between'>
                            <div className='date meta-last'> {formatDateTime(post.created_at)} </div>
                        </div>
                        <Link to={`/posts/${post.id}`} >
                            <h3>{post.title}</h3>
                        </Link>
                        <p className='text-muted'>
                            {post.snippet}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;