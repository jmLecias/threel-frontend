import React, { useCallback } from "react";
import Button from 'react-bootstrap/Button';

import { FaUpload } from "react-icons/fa";

import Dropzone from 'react-dropzone'
import { GiNuclearBomb } from "react-icons/gi";

const UploadDropzone = ({ onFileDrop }) => {

    return (

        <Dropzone
            onDrop={(acceptedFiles) => onFileDrop(acceptedFiles)}
            className="upload-container"
        >
            {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                    {...getRootProps({})}
                    className="upload-container"
                >
                    <input {...getInputProps()} />
                    <div className="upload-dropzone-content">
                        <div className="upload-icon">
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
