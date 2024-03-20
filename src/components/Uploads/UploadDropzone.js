import React, { useCallback } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { FaUpload } from "react-icons/fa";

import Dropzone from 'react-dropzone'
import { GiNuclearBomb } from "react-icons/gi";

const UploadDropzone = ({ onFileDrop }) => {

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

        onFileDrop(audioFiles);
    };

    return (

        <Dropzone
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
        >
            {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                    {...getRootProps({})}
                    className={`upload-container ${(isDragActive)? 'active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <div className="upload-dropzone-content">
                        <div className="upload-icon" >
                            {isDragActive ?
                                <GiNuclearBomb className="bomb" /> :
                                <FaUpload />
                            }
                        </div>
                        <span>Drag and drop audio files to upload</span>
                        <span className="small opacity-50 mb-4 text-center">Your uploads will be private unless you publish them.</span>
                        <Button
                            variant="danger"
                            onClick={() => { }}
                        >
                            Select Files
                        </Button>
                    </div>
                </div>
            )}
        </Dropzone>

    );
}

export default UploadDropzone;
