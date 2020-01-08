import React from 'react';
import {Spinner} from "react-bootstrap";

function Loader(props) {
    return (
        <div className="d-flex w-100 justify-content-center align-items-center py-2">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loader;
