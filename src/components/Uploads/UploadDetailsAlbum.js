import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import UploadCoverDropzone from "./UploadCoverDropzone";
import UploadAdditionalDropzone from "./UploadAdditionalDropzone";
import AlbumItem from "./AlbumItem";

import { useAuth } from "../../hooks/useAuth";
import { useItem } from "../../hooks/useItem";

const UploadDetailsAlbum = ({ files, onChange }) => {

    const { user } = useAuth();
    const { genres } = useItem();

    const musicGenres = () => {
        const mapped = [];
        genres.map((genre) => {
            mapped.push({ value: genre.id, label: genre.genre });
        })
        return mapped;
    }

    const mapAlbumData = (files) => {
        const mappedAlbumData = [];
        files.map((file, index) => {
            mappedAlbumData.push(
                {
                    key: index,
                    uploadType: 1,
                    userId: user.id,
                    title: file.name.substring(0, file.name.lastIndexOf('.')),
                    description: '',
                    cover: null,
                    content: file,
                    duration: 0,
                    visibility: 2,
                    genres: [],
                }
            );
        })
        return mappedAlbumData;
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
            setcoverPreview(
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="Cover Preview" title={acceptedFiles[0].path} />
            );
            setAlbum(prev => ({
                ...prev,
                cover: acceptedFiles[0],
            }));
        } else {
            toast.error(`Invalid file. Please select an image file as a cover photo.`, {
                autoClose: 3000,
                position: 'top-center'
            });
        }
    };

    const [coverPreview, setcoverPreview] = useState(<UploadCoverDropzone onImageDrop={handleCoverChange} />);
    const [albumItems, setAlbumItems] = useState(mapAlbumData(files));
    const [album, setAlbum] = useState({
        name: '',
        description: '',
        cover: null,
    })

    useEffect(() => {
        onChange(albumItems, album);
        console.log(albumItems);
        console.log(album);
    }, [albumItems, album]);

    const handleLoadedMetadata = (key, duration) => {
        setAlbumItems(currentAlbumItems =>
            currentAlbumItems.map(item =>
                item.key === key ? { ...item, duration: duration } : item
            )
        );
    };

    const handleTitleChange = (key, value) => {
        setAlbumItems(currentAlbumItems =>
            currentAlbumItems.map(item =>
                item.key === key ? { ...item, title: value } : item
            )
        );
    };

    const handleDescriptionChange = (key, value) => {
        setAlbumItems(currentAlbumItems =>
            currentAlbumItems.map(item =>
                item.key === key ? { ...item, description: value } : item
            )
        );
    };

    const handleSelectChange = (key, genres) => {
        setAlbumItems(currentAlbumItems =>
            currentAlbumItems.map(item =>
                item.key === key ? { ...item, genres: genres } : item
            )
        );
    };

    const handleDeleteClick = (key) => {
        setAlbumItems(currentAlbumItems =>
            currentAlbumItems.filter(item => item.key !== key)
        );
    }


    const renderAlbumItems = () => {
        console.log(albumItems);
        const mappedAlbumItems = []
        albumItems.map((item) => {
            mappedAlbumItems.push(
                <AlbumItem
                    key={item.key}
                    item={item}
                    onTitleChange={(value) => { handleTitleChange(item.key, value) }}
                    onDescriptionChange={(value) => { handleDescriptionChange(item.key, value) }}
                    onSelectChange={(genres) => { handleSelectChange(item.key, genres) }}
                    onClick={() => { }}
                    onDeleteClick={() => { handleDeleteClick(item.key) }}
                    onLoaded={(duration) => { handleLoadedMetadata(item.key, duration) }}
                    genres={musicGenres()}
                />
            )
        });
        return mappedAlbumItems;
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

        const newAudioFiles = audioFiles.filter(file =>
            !albumItems.some(item => item.content.path === file.path)
        );

        setAlbumItems(currentAlbumItems => ([
            ...currentAlbumItems,
            ...mapAlbumData(newAudioFiles)
        ]))
    };

    return (
        <div className="upload-container">
            <div className="upload-details">
                <div className="d-flex">
                    <div style={{ width: '70%', paddingRight: '1em' }}>
                        {renderAlbumItems()}

                        <div>
                            <UploadAdditionalDropzone onFileDrop={handleDrop} />
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <div style={{ width: '30%' }}>
                        <div className="fs-6 fw-normal opacity-50 mb-2">Album Cover</div>
                        <div className="upload-thumbnail-container">
                            {coverPreview}
                        </div>
                        <br />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder="Name"
                            value={album.name}
                            onChange={(event) => {setAlbum(prev => ({...prev, name: event.target.value}))}}
                        />
                        <textarea
                            className='form-control mb-2'
                            style={{height: '10%'}}
                            value={album.description}
                            placeholder="Description"
                            onChange={(event) => {setAlbum(prev => ({...prev, description: event.target.value}))}}
                        />
                        <div>
                            <span className="small fw-light opacity-50 mb-3">Total Size</span><br />
                            {/* <span className="small opacity-75">{(files.size / 1049000).toPrecision(2)} mb</span> */}
                            <span className="small fw-light opacity-50">Total Duration</span><br />
                            {/* <span className="small opacity-75">{formatDuration(0)}</span> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UploadDetailsAlbum;
