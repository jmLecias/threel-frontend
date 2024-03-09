import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ThreelModal = ({ show, title, description, close, action, onClose, onAction }) => {

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>
                    <h1 className="modal-title">{title}</h1>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="modal-text">{description}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >{close}</Button>
                {action !== '' && (
                    <Button
                        variant="danger"
                        onClick={onAction}
                    >{action}</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ThreelModal;