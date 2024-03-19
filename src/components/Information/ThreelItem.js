import React, { useState, useEffect } from 'react';
import { threelApiBaseUrl } from '../../backend/api';

import { FaCirclePlay } from "react-icons/fa6";

const ThreelItem = ({ item, width, onClick }) => {

    const filePath = item.thumbnail;
    const filename = filePath.split('/').pop();

    // var albumCover;
    // var albumCoverFilename;
    // if(item.album.cover) {
    //     albumCover = item.album.cover;
    //     albumCoverFilename = albumCover.split('/').pop();
    // }

    return (
        <div
            className='threel-item'
            onClick={onClick}
        >
            <div className='threel-item-cover box-shadow mx-auto my-auto'>
                {item.thumbnail !== "" && (
                    <img
                        src={`${threelApiBaseUrl}/thumbnail/${filename}`}
                        alt={`${item.title} cover`}
                    />
                )}
                {/* {item.album && (
                    <img
                        src={`${threelApiBaseUrl}/album/cover/${albumCoverFilename}`}
                        alt={`${item.title} cover`}
                    />
                )} */}
                {(item.thumbnail === "") && (
                    <img
                        src={'uploads/Gemini_Generated_Image.jfif'}
                        alt={`${item.title} cover`}
                    />
                )}
            </div>
            <span className='threel-item-title'>{item.title}</span>
            <span className='threel-item-artist'>{item.user.username}</span>
                <FaCirclePlay className='play-circle box-shadow' size={40}/>
        </div>
    )
}

export default ThreelItem;