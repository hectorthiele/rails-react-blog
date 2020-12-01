import React from "react";

import { formatDateTime } from '../utils/DateFormatter';

const PostItem = (props) => {
    console.log("Props PostItem", props);
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
                        <a href={'#'} >
                            <h3>{post.title}</h3>
                        </a>
                        <p className='text-muted' >
                            {post.snippet}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;