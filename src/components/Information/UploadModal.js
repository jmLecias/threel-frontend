import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MdOutlineImageSearch } from "react-icons/md";

import { useAuth } from "../../hooks/useAuth";

const UploadModal = ({ show, title, close, action, onClose, onAction }) => {

    const { user } = useAuth();

    const [upload, setUpload] = useState({
        uploadType: 1,
        userId: user.id,
        title: '',
        description: '',
        cover: null,
        content: null,
    });

    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        setUpload(prev => ({
            ...prev,
            cover: file,
        }));
    };

    const handleContentChange = (event) => {
        const file = event.target.files[0];
        setUpload(prev => ({
            ...prev,
            content: file,
        }));
    };

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
                    <h5 className="modal-title">{title}</h5>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex">
                    <div className="w-50 pe-3">
                        <input
                            className='form-control mb-4'
                            type="text"
                            placeholder="Title"
                            value={upload.title}
                            onChange={(event) => {
                                setUpload((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                }))
                            }}
                        />
                        <textarea
                            className='form-control mb-4 h-50'
                            value={upload.description}
                            onChange={(event) => {
                                setUpload((prev) => ({
                                    ...prev,
                                    description: event.target.value,
                                }))
                            }}
                        />
                        <span className="text-black">Select your {upload.uploadType}:</span>
                        <input
                            className='form-control  mt-4'
                            type="file"
                            accept=".mp3, .ogg, .aac"
                            onChange={handleContentChange}
                        />
                    </div>
                    <div className="w-50">
                        <div className="upload-thumbnail-container">
                            {!upload.cover && (
                                <div className="d-flex flex-column align-items-center">
                                    <MdOutlineImageSearch size={100} />
                                    Select a thumbnail for your {upload.uploadType}
                                </div>
                            )}
                            {upload.cover && (
                                <img
                                    src={URL.createObjectURL(upload.cover)}
                                    alt="Thumbnail Preview"
                                    className="img-fluid"
                                />
                            )}
                        </div>
                        <input
                            className='form-control  mt-4'
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleCoverChange}
                        />
                    </div>

                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        onClose();
                        setUpload({
                            uploadType: 1,
                            userId: user.id,
                            title: '',
                            description: '',
                            cover: null,
                            content: null,
                        });
                    }}
                >{close}</Button>
                {action !== '' && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            onAction(upload);
                            // setUpload({
                            //     uploadType: 1,
                            //     userId: user.id,
                            //     title: '',
                            //     description: '',
                            //     cover: null,
                            //     content: null,
                            // });
                        }}
                    >{action}</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default UploadModal;