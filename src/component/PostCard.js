import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

function PostCard(props) {
    const { name, thumbnail: { image_url }, id, votes_count, comments_count } = props.post;
    return (
        <div className="col-md-4 mb-2 p-1">
            <div className="border px-3 py-1">
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <h5>{name}</h5>
                </div><hr />
                <div className="w-100">
                    <img alt="img" className="w-100" src={image_url} />
                </div><hr />
                <div id="like-btn" className="d-flex cursor-pointer">
                    <div className="w-50">
                       <FontAwesomeIcon icon={faThumbsUp} />
                       <span className="ml-1">{votes_count}</span>
                    </div>
                    <div className="w-50 text-right cursor-pointer">
                       <FontAwesomeIcon icon={faComment} />
                       <span className="ml-1">{comments_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
