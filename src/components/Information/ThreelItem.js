import React, { useState, useEffect } from 'react';
import { threelApiBaseUrl } from '../../backend/api';

const ThreelItem = ({ item, width, onClick }) => {

    const filePath = item.thumbnail;
    const filename = filePath.split('/').pop();

    return (
        <div
            className='threel-item'
            style={{ width: `${width}px` }}
            onClick={onClick}
        >
            <div className='threel-item-cover box-shadow'>
                {item.thumbnail && (
                    <img
                        src={`${threelApiBaseUrl}/thumbnail/${filename}`}
                        alt={`${item.title} cover`}
                        height={'100%'}
                        width={'100%'}
                    />
                )}
                {!item.thumbnail && (
                    <img
                        src={'uploads/Gemini_Generated_Image.jfif'}
                        alt={`${item.title} cover`}
                        height={'100%'}
                        width={'100%'}
                    />
                )}
            </div>
            <span className='threel-item-title'>{item.title}</span>
            <span className='threel-item-artist'>{item.user.username}</span>
        </div>
    )
}

export default ThreelItem;