import React, { useState } from 'react';

const PostsView = () => {
    const [count, setCount] = useState(0);


    return (
        <div className='container'>
            <h2> Blog View Content </h2>
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </div>
    );
};

export default PostsView;