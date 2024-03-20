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
    const { uploadSingle, uploadAlbum } = useArtist();

    const [isUploading, setIsUploading] = useState(false);
    const [uploadDetails, setUploadDetails] = useState(null);
    const [albumDetails, setAlbumDetails] = useState(null);

    const handleDetailsChange = (upload, album) => {
        setUploadDetails(upload);
        if (album) {
            setAlbumDetails(album);
        }
    }

    const validateUploadDetails = (uploadDetails) => {
        if (uploadDetails.length === 0) {
            return false;
        } else if (uploadDetails.length > 1) {
            if (!albumDetails.name || !albumDetails.description || !albumDetails.cover) {
                return false;
            }

            for (const uploadDetail of uploadDetails) {
                if (uploadDetail.title === '') {
                    return false;
                }

                if (uploadDetail.genres.length === 0) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleSubmit = () => {
        console.log(albumDetails);
        // setIsUploading(true);

        if (!validateUploadDetails(uploadDetails)) {
            toast.error('Please complete your album upload details.', {
                autoClose: 3000,
                position: 'top-center',
            });
            setIsUploading(false);
            return;
        }

        if (albumDetails === null) {
            uploadSingle(uploadDetails[0]).then((success) => {
                if (success) {
                    getUploads();
                    toast.success(uploadDetails[0].title + ' was uploaded successfully!', {
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
        else {
            uploadAlbum(albumDetails).then((album) => {
                const albumUploads = uploadDetails.map((upload) => ({
                    ...upload,
                    albumId: album.id
                }));

                albumUploads.forEach((upload) => {
                    console.log(upload);
                    uploadSingle(upload).then((success) => {
                        if (success) {
                            getUploads();
                        }
                    }).catch((e) => {
                        toast.error(`Error while uploading ` + upload.title, {
                            autoClose: 3000,
                            position: 'bottom-center',
                        });
                    })
                })

                toast.success(album.name + ' was uploaded successfully!', {
                    autoClose: 3000,
                });

                handleClose();
            }).catch((e) => {
                console.log(e)
                toast.error(`Error while creating the album`, {
                    autoClose: 3000,
                    position: 'bottom-center',
                });
            })
        }

    }

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length === 1) {
            setModalBody(
                <UploadDetailsSingle file={acceptedFiles[0]} onChange={handleDetailsChange} />
            );
            setShowFooter(true);
        } else if (acceptedFiles.length > 1) {
            setModalBody(
                <UploadDetailsAlbum files={acceptedFiles} onChange={handleDetailsChange} />
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