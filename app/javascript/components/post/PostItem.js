import React from "react";
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/DateFormatter';

const PostItem = (props) => {
    const { post } = props;

    return (
        <div className="post col-xl-12" >
            <PostImage post={post} />
            <div className='card'>
                <div className="card-body">
                    <div className="post-details">
                        <div className='post-meta justify-content-between'>
                            <div className='date meta-last'> {formatDateTime(post.created_at)}</div>
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

const PostImage = (props) => {
    const { post } = props;
    const urlImage = post.url_image;

    if (!urlImage){
        return null;
    }

    return (
        <div className='post-thumbnail'>
            <img className="card-img-top" src={urlImage} alt="Post Image"/>
        </div>
    );
};

const CustomTitleLink = (props) => {
    const { post } = props;
    const isRemote = post.source === 'remote';
    const url = isRemote ? post.url : `/posts/${post.id}`;
    const targetType = isRemote ? '_blank' : null;

    if (isRemote){
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