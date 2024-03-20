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
                    albumId: null,
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

    const handleCoverChange = (imageFile) => {
        setcoverPreview(
            <img src={URL.createObjectURL(imageFile)} alt="Cover Preview" title={`${imageFile.path} Change?`} />
        );

        setAlbum(prev => ({
            ...prev,
            cover: imageFile,
        }));
    };

    const [coverPreview, setcoverPreview] = useState(<UploadCoverDropzone onImageDrop={handleCoverChange} />);
    const [albumItems, setAlbumItems] = useState(mapAlbumData(files));
    const [album, setAlbum] = useState({
        name: '',
        description: '',
        cover: null,
        userId: user.id,
    })

    useEffect(() => {
        onChange(albumItems, album);
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
        // console.log(albumItems);
        const mappedAlbumItems = []
        albumItems.map((item, index) => {
            mappedAlbumItems.push(
                <AlbumItem
                    key={item.key}
                    index={index + 1}
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
        setAlbumItems(currentAlbumItems => ([
            ...currentAlbumItems,
            ...mapAlbumData(acceptedFiles)
        ]))
    };

    return (
        <div className="upload-container">
            <div className="upload-details">
                <div className="d-flex">
                    <div style={{ width: '70%', paddingRight: '1em' }}>
                        <div className="fs-6 fw-normal opacity-50 mb-2">{albumItems.length} Songs</div>
                        {renderAlbumItems()}
                        <div>
                            <UploadAdditionalDropzone onFileDrop={handleDrop} />
                        </div>
                        <br />
                        <br />
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
                            onChange={(event) => { setAlbum(prev => ({ ...prev, name: event.target.value })) }}
                        />
                        <textarea
                            className='form-control mb-2'
                            style={{ height: '8%' }}
                            value={album.description}
                            placeholder="Description"
                            onChange={(event) => { setAlbum(prev => ({ ...prev, description: event.target.value })) }}
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
