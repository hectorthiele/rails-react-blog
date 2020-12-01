import React from "react";

const PostItem = (props) => {
    console.log("Props PostItem", props);
    const { post } = props;
    return (
        <div className="post col-xl-12" >
            <div className='post-thumbnail'>
                <img className="card-img-top" src="..." alt="Card image cap"/>
            </div>

            <div className="post-details">
                <div className='post-meta d-flex justify-content-between'>
                    <div className='date meta-last'> {post.created_at} </div>
                </div>
                <a href={'#'} >
                    <h3>{post.title}</h3>
                </a>
                <p className='text-muted' >
                    {post.content}
                </p>
            </div>
        </div>
    );
};

export default PostItem;