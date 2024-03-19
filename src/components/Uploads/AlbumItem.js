import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { CloseButton } from 'react-bootstrap';

const AlbumItem = ({ item, onTitleChange, onSelectChange, onDescriptionChange, onClick, onDeleteClick, onLoaded, genres }) => {

    const audioUrl = URL.createObjectURL(item.content);

    const [duration, setDuration] = useState(0)

    const handleSelectChange = (genres) => {
        onSelectChange(genres);
    };

    const handleLoadedMetadata = (e) => {
        setDuration(e.target.duration);
    };

    useEffect(() => {
        onLoaded(duration);
    }, [duration]);

    function formatDuration(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds - (minutes * 60));
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <div
            className='upload-album-item '
            onClick={onClick}
        >
            <div style={{ width: '60%', paddingRight: '1em' }}>
                <input
                    className='form-control mb-2'
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(event) => { onTitleChange(event.target.value) }}
                />
                <textarea
                    className='form-control mb-2 h-25'
                    value={item.description}
                    placeholder="Description"
                    onChange={(event) => { onDescriptionChange(event.target.value) }}
                />
                <Select
                    isMulti
                    name="Genres"
                    options={genres}
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
            <div style={{ width: '40%' }}>
                <div className='d-flex justify-content-end mb-3'>
                    <CloseButton onClick={() => {onDeleteClick()}}/>
                </div>
                <audio src={audioUrl} controls onLoadedMetadataCapture={(event) => handleLoadedMetadata(event)} />
                <div className="d-flex align-items-center text-nowrap cursor-pointer mb-1" title={item.content.path}>
                    <span className="small fw-light opacity-50">Filename - </span>
                    <span className="small opacity-75 d-inline-block text-truncate" style={{ maxWidth: '100%' }}>{item.content.path}</span>
                </div>
                <div className="text-nowrap cursor-pointer mb-1">
                    <span className="small fw-light opacity-50">Size - </span>
                    <span className="small opacity-75">{(item.content.size / 1049000).toPrecision(2)} mb</span>
                </div>

                <div className='text-nowrap cursor-pointer mb-1'>
                    <span className="small fw-light opacity-50">Duration - </span>
                    <span className="small opacity-75">{formatDuration(duration)}</span>
                </div>
            </div>
        </div>
    )
}

export default AlbumItem;