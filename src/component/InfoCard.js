import React from 'react';

function InfoCard(props) {
    return (
        <div className="row m-0" >
            <div className="row w-100 mx-0 p-1 my-1 bg-white">
                <div className="m-0" style={{ width: 50 }}>
                    <img src="https://www.gstatic.com/webp/gallery/2.jpg" className="" height="45" width="45" alt="Avatar" style={{ borderRadius: 100 }} />
                </div>
                <div className="flex-fill pl-2 pt-2">
                    <div>
                        <p>Vikrant Shirvankar</p>
                    </div>
                    {
                        props.comment &&
                        <>
                            <div >
                                <p>Vikrant Shirvankar</p>
                            </div>
                            <div >
                                <InfoCard />
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}

export default InfoCard;
