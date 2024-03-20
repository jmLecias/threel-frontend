import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { CloseButton } from 'react-bootstrap';

const AlbumItem = ({ index, item, onTitleChange, onSelectChange, onDescriptionChange, onClick, onDeleteClick, onLoaded, genres }) => {

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
            <div className='header mb-3'>
                <span className="fs-6 fw-light opacity-50">Song {index}</span>
                <div className='d-flex align-items-center w-75'>
                    <audio src={audioUrl} controls onLoadedMetadataCapture={(event) => handleLoadedMetadata(event)} />
                </div>
                <CloseButton onClick={() => { onDeleteClick() }} />
            </div>
            <div className='details'>
                <div style={{ width: '100%' }}>
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
                    <div className='mt-3'>
                        <table>
                            <tr>
                                <td className='text-end'>
                                    <span className="small fw-light opacity-50 text-end">Filename</span>
                                </td>
                                <td>
                                    <span className="small opacity-75 text-truncate ms-3">{item.content.path}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-end'>
                                    <span className="small fw-light opacity-50 text-end">Size</span>
                                </td>
                                <td>
                                    <span className="small opacity-75 ms-3">{(item.content.size / 1049000).toPrecision(2)} mb</span>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-end'>
                                    <span className="small fw-light opacity-50 text-end">Duration</span>
                                </td>
                                <td>
                                    <span className="small opacity-75 ms-3">{formatDuration(duration)}</span>
                                </td>
                            </tr>
                        </table>
                        {/* <div className='d-flex align-items-center'>
                            <span className="small fw-light opacity-50 me-1">Filename -</span>
                            <span className="small opacity-75 d-inline-block text-truncate" style={{ maxWidth: '100%' }}>{item.content.path}</span><br />
                        </div>
                        <div className='d-flex align-items-center'>
                            <span className="small fw-light opacity-50 me-1">Size -</span>
                            <span className="small opacity-75 me-5">{(item.content.size / 1049000).toPrecision(2)} mb</span>
                        </div>
                        <div className='d-flex align-items-center'>
                            <span className="small fw-light opacity-50 me-1">Duration - </span>
                            <span className="small opacity-75">{formatDuration(duration)}</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumItem;