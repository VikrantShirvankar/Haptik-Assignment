import React from 'react';
import { Modal } from 'react-bootstrap';
import InfoCard from "./InfoCard";
import Loader from "./Loader";

function CommentModal(props) {
    const { comments,loading } = props;
    return (
        <>
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => props.hide(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Comments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: 300 }}>
                    {
                        loading && !comments.length ? <Loader /> :
                        comments && comments.length ?
                            comments.map(comment =>
                                <div key={comment.id} className="row m-0" >
                                    <InfoCard data={comment} comment={true} />
                                </div>
                            ) : ''
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CommentModal;
