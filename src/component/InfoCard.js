import React from 'react';

function InfoCard(props) {
    const { data } = props;
    const { user: { image_url: { original }, username}, body } = data;
    return (
        <div className="row m-0" >
            <div className="row w-100 mx-0 p-1 my-1 bg-white">
                <div className="m-0" style={{ width: 50 }}>
                    <img src={original} className="" height="45" width="45" alt="Avatar" style={{ borderRadius: 100 }} />
                </div>
                <div className="pl-2 pt-2">
                    <p>{username}</p>
                </div>
                <div className="w-100 pl-2 pt-2">
                    {
                        props.comment &&
                        <div className="w-100">
                            <p>{body}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default InfoCard;
