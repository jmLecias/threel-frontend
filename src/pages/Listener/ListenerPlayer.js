import React, { useRef, useState } from 'react';
import { threelApiBaseUrl } from '../../backend/api';
import { useLocation } from 'react-router-dom';

import ReactPlayer from 'react-player';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

const ListenerPlayer = ({ }) => {
    const location = useLocation();
    const item = location.state.item;

    const thumbnailPath = item.thumbnail;
    const thumbnailFile = thumbnailPath.split('/').pop();

    const contentPath = item.content;
    const contentFile = contentPath.split('/').pop();

    const [playing, setPlaying] = useState(false);

    const breadcrumbs = [
        { label: 'Explore', link: '/' },
        { label: item.title, link: '/play' },
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
                        <img
                            src={`${threelApiBaseUrl}/thumbnail/${thumbnailFile}`}
                            alt={`${item.title} cover`}
                            height={'100%'}
                            width={'100%'}
                        />
                    </div>
                    <div className='player-controls'>
                        <ReactPlayer
                            url={`${threelApiBaseUrl}/content/${contentFile}`}
                            playing={playing}
                            controls
                            width="100%"
                            height="40px"
                            config={{
                                file: {
                                    forceAudio: true,
                                },
                            }}
                            onReady={() => setPlaying(false)} // Auto-play when ready
                            onEnded={() => setPlaying(false)} // Pause when ended
                        />
                    </div>
                </div>

            </div>
            <div className='player-side'>
                <span className='threel-item-title'>{item.title}</span>
                <span className='threel-item-artist'>{item.user.username}</span>
                <br />
                <span className='threel-item-title'>DESCRIPTION</span>
                <span className='threel-item-artist'>{item.description}</span>
            </div>
        </div>

    )
}

export default ListenerPlayer;