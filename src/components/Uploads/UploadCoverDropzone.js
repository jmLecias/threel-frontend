import React, { useCallback } from "react";

import { MdOutlineImageSearch } from "react-icons/md";

import Dropzone from 'react-dropzone'

const UploadCoverDropzone = ({ onImageDrop }) => {

    return (

        <Dropzone
            onDrop={acceptedFiles => onImageDrop(acceptedFiles)}
            
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    {...getRootProps({})}
                    className="upload-cover-dropzone"
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
