import React from 'react';
import { Modal } from 'react-bootstrap';
import InfoCard from "./InfoCard";

function CommentModal(props) {
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
                <Modal.Body>
                    <div className="row m-0" >
                        <InfoCard comment={true} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CommentModal;
