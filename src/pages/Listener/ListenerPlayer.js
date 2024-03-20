import React, { useRef, useState } from 'react';
import { threelApiBaseUrl } from '../../backend/api';
import { useLocation } from 'react-router-dom';

import AudioPlayer from 'react-h5-audio-player';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

const ListenerPlayer = ({}) => {
    const location = useLocation();
    const item = location.state.item;

    var thumbnailFile ;
    if (!item.thumbnail) {
        const thumbnailPath = item.album.cover;
        thumbnailFile = thumbnailPath.split('/').pop();
    } else {
        const thumbnailPath = item.thumbnail;
        thumbnailFile = thumbnailPath.split('/').pop();
    }

    const contentPath = item.content;
    const contentFile = contentPath.split('/').pop();

    const contentURL = (item.content !== "") ?
        `${threelApiBaseUrl}/content/${contentFile}` :
        'uploads/Rick Astley - Never Gonna Give You Up (Official Music Video) (128kbps).mp3';
        
    const breadcrumbs = [
        { label: 'Explore', link: '/' },
        { label: item.title, link: '' },
    ]

    return (
        <div className='listener-player-grid'>
            <div className='player-main'>
                <div>
                    <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className='player-main-content'>
                    <br />
                    <br />
                    <div className='player-cover'>
                        {item.thumbnail !== "" && (
                            <img
                                src={`${threelApiBaseUrl}/cover/${thumbnailFile}`}
                                alt={`${item.title} cover`}
                                height={'100%'}
                                width={'100%'}
                            />
                        ) || (
                                <img
                                    src={'uploads/Gemini_Generated_Image.jfif'}
                                    alt={`${item.title} cover`}
                                    height={'100%'}
                                    width={'100%'}
                                />
                            )}
                    </div>
                    <div className='player-controls'>
                        <AudioPlayer
                            autoPlay
                            src={contentURL}
                            onPlay={e => {}}
                        />
                    </div>
                </div>

            </div>
            <div className='player-side'>
                <span className='player-side-title'>{item.title}</span>
                <span className='player-side-artist'>{item.user.username}</span>
                <br />
                <br />
                <br />
                <hr />
                <br />
                <span className='player-side-label'>DESCRIPTION</span>
                <span className='player-side-description'>{item.description}</span>
            </div>
        </div>

    )
}

export default ListenerPlayer;