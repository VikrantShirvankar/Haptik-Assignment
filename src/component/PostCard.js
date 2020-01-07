import React from 'react';

function PostCard(props) {
    const { name, imageUrl, id } = props;
    return (
        <div className="col-md-4 mb-2 p-1" data-id={id} style={{ zIndex: 10 }}>
            <div className="border px-3 py-1">
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <h5>{name}</h5>
                </div><hr />
                <div className="w-100">
                    <img className="w-100" src={imageUrl} />
                </div><hr />
                <p id="like-btn">Like</p>
            </div>
        </div>
    );
}

export default PostCard;
