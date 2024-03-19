import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import UploadDropzone from "./UploadDropzone";
import UploadDetailsSingle from "./UploadDetailsSingle";
import UploadDetailsAlbum from "./UploadDetailsAlbum";

import { useArtist } from "../../hooks/useArtist";
import { useItem } from "../../hooks/useItem";

const UploadModal = ({ show, title, close, action, onClose, onAction }) => {

    const { getUploads } = useItem();
    const { uploadSingle } = useArtist();

    const [isUploading, setIsUploading] = useState(false);
    const [uploadDetails, setUploadDetails] = useState(null);
    const [albumDetails, setAlbumDetails] = useState(null);

    const handleDetailsChange = (upload) => {
        console.log('Upload Modal: ')
        console.log(upload[0])
        setUploadDetails(upload);
        // setAlbumDetails(album);
    }

    const validateUploadDetails = (uploadDetails) => {
        if (uploadDetails.length > 1) {
            if (!albumDetails.name || !albumDetails.description || !albumDetails.cover) {
                return false;
            }

            for (const uploadDetail of uploadDetails) {
                if (uploadDetail.genres.length === 0) {
                    return false;
                }
            }

        } else if (uploadDetails.length > 0 && uploadDetails.length < 2) {
            return true;
        }

        return true;
    };

    const handleSubmit = () => {
        setIsUploading(true);

        if (!validateUploadDetails(uploadDetails)) {
            toast.error('Please check your album upload details.', {
                autoClose: 3000,
                position: 'top-center',
            });
            setIsUploading(false);
            return;
        }

        uploadSingle(uploadDetails[0]).then((success) => {
            if (success) {
                getUploads();
                toast.success(' Uploaded successfully!', {
                    autoClose: 3000,
                });
                handleClose();
            }
        }).catch((e) => {
            console.log(e)
            toast.error(`Error while uploading song`, {
                autoClose: 3000,
                position: 'bottom-center',
            });
        })
    }

    const handleDrop = (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            if (!file.type.startsWith('audio/')) {
                toast.error(`File "${file.name}" was rejected because it is not an audio file.`, {
                    autoClose: 3000,
                    position: 'top-center'
                });
            }
        });

        const audioFiles = acceptedFiles.filter(file => file.type.startsWith('audio/'));


        if (audioFiles.length > 0 && audioFiles.length < 2) {
            setModalBody(
                <UploadDetailsSingle file={audioFiles[0]} onChange={handleDetailsChange} />
            );
            setShowFooter(true);
        } else if (audioFiles.length > 0 && audioFiles.length > 1) {
            setModalBody(
                <UploadDetailsAlbum files={audioFiles} onChange={handleDetailsChange} />
            );
            setShowFooter(true);
        }
    };

    const handleClose = () => {
        onClose();
        setModalBody(<UploadDropzone onFileDrop={handleDrop} />)
        setShowFooter(false)
    }

    const [modalBody, setModalBody] = useState(<UploadDropzone onFileDrop={handleDrop} />);
    const [showFooter, setShowFooter] = useState(false)

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            backdrop="static"
            keyboard={false}
            onHide={() => { handleClose() }}
            contentClassName="upload-modal-dialog"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {modalBody}
            </Modal.Body>

            {showFooter && (
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => { handleClose() }}
                    >{close}</Button>
                    {action !== '' && (
                        <Button
                            variant="danger"
                            onClick={() => { handleSubmit() }}
                        >{action}</Button>
                    )}
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default UploadModal;