import React, { useCallback } from "react";
import { toast } from 'react-toastify';

import { MdOutlineImageSearch } from "react-icons/md";

import Dropzone from 'react-dropzone'

const UploadCoverDropzone = ({ onImageDrop }) => {

    const handleImageDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 1) {
            toast.error(`Too many files. Please select only one cover photo.`, {
                autoClose: 3000,
                position: 'top-center'
            });
            return;
        }

        if (!acceptedFiles[0].type.startsWith('image/')) {
            toast.error(`Invalid file. Please select an image file as a cover photo.`, {
                autoClose: 3000,
                position: 'top-center'
            });
            return;
        }

        onImageDrop(acceptedFiles[0]);
    };

    return (
        <Dropzone
            onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}
        >
            {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                    {...getRootProps({})}
                    className={`upload-cover-dropzone ${(isDragActive)? 'active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <MdOutlineImageSearch size={100} />
                    <span className="small w-75 text-center">Click to select a cover photo or drop one here.</span>
                </div>
            )}
        </Dropzone>

    );
}

export default UploadCoverDropzone;
