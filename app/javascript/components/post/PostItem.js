import React from "react";
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/DateFormatter';

import PostImage from './PostImage';

const PostItem = (props) => {
    const { post } = props;

    const isRemote = post.source === 'remote';
    const category = isRemote ? 'Remote' : 'Local';
    const classCategory = isRemote ? 'label-warning' : 'label-success';

    return (
        <div className="post col-xl-6" style={{ marginTop: 40 }} >
            <PostImage post={post} />
            <div className='card'>
                <div className="card-body">
                    <div className="post-details">
                        <div className='post-meta d-flex justify-content-between'>
                            <div className='date meta-last'> {formatDateTime(post.created_at)}</div>
                            <div className='category'>
                                <span className={`label ${classCategory}`}>{category} Post</span>
                            </div>
                        </div>
                        <CustomTitleLink post={post} />
                        <p className='text-muted'>
                            {post.snippet}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CustomTitleLink = ({ post }) => {
    const isRemote = post.source === 'remote';
    const url = isRemote ? post.url : `/posts/${post.id}`;
    const targetType = isRemote ? '_blank' : null;

    if (isRemote) {
        return (
            <a href={url} target={targetType} >
                <h3>{post.title}</h3>
            </a>
        );
    }

    return (
        <Link to={url} target={targetType} >
            <h3>{post.title}</h3>
        </Link>
    );
};

export default PostItem;