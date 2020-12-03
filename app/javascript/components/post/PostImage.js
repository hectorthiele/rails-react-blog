import React from "react";

const PostImage = ({ post }) => {
  const isRemote = post.source === 'remote';
  let urlImage = null; //post.url_image || post.image.url;
  if (isRemote) {
    urlImage = post.url_image;
  } else {
    urlImage = post.image ? post.image.url : null;
  }


  if (!urlImage) {
    return null;
  }

  return (
    <div className='post-thumbnail'>
      <img className="img-fluid" src={urlImage} alt="Post Image" />
    </div>
  );
};

export default PostImage;
