import React, { useState, useEffect } from 'react';
import { threelApiBaseUrl } from '../../backend/api';

import { FaCirclePlay } from "react-icons/fa6";

const ThreelArtist = ({ artist, onClick }) => {

    return (
        <div
            className='threel-artist'
            onClick={onClick}
        >
            <div className='threel-artist-profile box-shadow mx-auto my-auto'>
                <img
                    src={"uploads/artist.jpg"}
                    alt={`${artist.username} cover`}
                />
            </div>
            <span className='threel-artist-name mx-auto'>{artist.username}</span>
        </div>
    )
}

export default ThreelArtist;