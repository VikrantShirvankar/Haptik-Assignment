import React from 'react';

function PostCard(props) {
    return (
        <div className="col-md-4 mb-2 p-1">
            <div className="border px-3 py-1">
                <p>Title</p>
                <div className="w-100">
                    <img className="w-100" src="https://www.gstatic.com/webp/gallery/2.jpg" />
                </div>
                <p>Like</p>
            </div>
        </div>
    );
}

export default PostCard;
