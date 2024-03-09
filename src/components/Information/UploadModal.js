import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MdOutlineImageSearch } from "react-icons/md";

import { useArtist } from "../../hooks/useArtist";

const UploadModal = ({ show, title, close, action, onClose, onAction }) => {
    const { upload, setUpload } = useArtist();

    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        setSelectedThumbnail(file);
    };

    const handleContentChange = (event) => {
        const file = event.target.files[0];
        setSelectedContent(file);
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
                            onChange={() => { }}
                        />
                        <textarea
                            className='form-control mb-4 h-50'
                            placeholder="Description"
                            onChange={() => { }}
                        />
                        <span className="text-black">Select your {upload.type}:</span>
                        <input
                            className='form-control  mt-4'
                            type="file"
                            accept=".mp3, .ogg, .aac"
                            onChange={handleContentChange}
                        />
                    </div>
                    <div className="w-50">
                        <div className="upload-thumbnail-container">
                            {!upload.thumbnail && !selectedThumbnail && (
                                <div className="d-flex flex-column align-items-center">
                                    <MdOutlineImageSearch size={100} />
                                    Select a thumbnail for your {upload.type}
                                </div>
                            )}
                            {selectedThumbnail && (
                                <img
                                    src={URL.createObjectURL(selectedThumbnail)}
                                    alt="Thumbnail Preview"
                                    className="img-fluid"
                                />
                            )}
                        </div>
                        <input
                            className='form-control  mt-4'
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleThumbnailChange}
                        />
                    </div>

                </div>
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

export default UploadModal;