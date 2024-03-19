import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import Select from 'react-select';

import UploadCoverDropzone from "./UploadCoverDropzone";

import { useAuth } from "../../hooks/useAuth";
import { useItem } from "../../hooks/useItem";

const UploadDetailsSingle = ({ file, onChange }) => {

    const { user } = useAuth();
    const { genres } = useItem();

    const musicGenres = () => {
        const mapped = [];
        genres.map((genre) => {
            mapped.push({ value: genre.id, label: genre.genre });
        })
        return mapped;
    }

    const handleCoverChange = (acceptedFiles) => {
        if (acceptedFiles.length > 1) {
            toast.error(`Too many files. Please select only one cover photo.`, {
                autoClose: 3000,
                position: 'top-center'
            });
            return;
        }

        if (acceptedFiles[0].type.startsWith('image/')) {
            setUpload(prev => ({
                ...prev,
                cover: acceptedFiles[0],
            }));

            setcoverPreview(
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="Cover Preview" />
            )
        } else {
            toast.error(`Invalid file. Please select an image file as a cover photo.`, {
                autoClose: 3000,
                position: 'top-center'
            });
        }
    };

    const [duration, setDuration] = useState(0);
    const [coverPreview, setcoverPreview] = useState(<UploadCoverDropzone onImageDrop={handleCoverChange} />);

    const [upload, setUpload] = useState({
        uploadType: 1,
        userId: user.id,
        title: file.name.substring(0, file.name.lastIndexOf('.')),
        description: '',
        cover: null,
        content: file,
        duration: duration,
        visibility: 2,
        genres: [],
    });

    useEffect(() => {
        onChange([upload]);
        console.log('Upload Single Details: ')
        console.log([upload])
    }, [upload])

    const handleSelectChange = (genres) => {
        setUpload(prev => ({
            ...prev,
            genres: genres,
        }))
    };

    const handleLoadedMetadata = (e) => {
        setDuration(e.target.duration);
    };

    function formatDuration(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds - (minutes * 60));
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }


    return (
        <div className="upload-container">
            <div className="upload-details">
                <div className="d-flex">
                    <div style={{ width: '65%', paddingRight: '1em' }}>
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
                            placeholder="Description"
                            onChange={(event) => {
                                setUpload((prev) => ({
                                    ...prev,
                                    description: event.target.value,
                                }))
                            }}
                        />
                        <span className="small opacity-75">Must have atleast one genre</span>
                        <Select
                            isMulti
                            name="Genres"
                            options={musicGenres()}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select Genres..."
                            onChange={handleSelectChange}
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#2684FF',
                                    primary: '#272729',
                                    neutral0: '#0A0A23',
                                    neutral80: '#FFFFFF',
                                    neutral60: '#B2B2B2',
                                },
                            })}
                            styles={{
                                multiValue: (styles, state) => ({
                                    ...styles,
                                    backgroundColor: '#ff2631',
                                    color: '#000',
                                    ':hover': {
                                        backgroundColor: '#FFFFFF',
                                        color: '#000'
                                    },
                                }),
                                multiValueLabel: (styles, state) => ({
                                    ...styles,
                                    color: '#000'
                                }),
                            }}
                        />
                    </div>
                    <div style={{ width: '35%' }}>
                        <div className="fs-6 fw-normal opacity-50 mb-2">Album Cover</div>
                        <div className="upload-thumbnail-container">
                            {coverPreview}
                        </div>
                        <br />
                        <audio src={URL.createObjectURL(file)} controls onLoadedMetadataCapture={handleLoadedMetadata} />
                        <br />
                        <div className="mb-3">
                            <span className="small fw-light opacity-50">Filename</span><br />
                            <span className="small opacity-75">{file.path}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-5">
                                <span className="small fw-light opacity-50">Size</span><br />
                                <span className="small opacity-75">{(file.size / 1049000).toPrecision(2)} mb</span>
                            </div>
                            <div>
                                <span className="small fw-light opacity-50">Duration</span><br />
                                <span className="small opacity-75">{formatDuration(duration)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UploadDetailsSingle;
