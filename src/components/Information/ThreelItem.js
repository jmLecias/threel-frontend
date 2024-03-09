import React, { useState, useEffect } from 'react';

const ThreelItem = ({ item, width}) => {
    return (
        <div className='threel-item' style={{width: `${width}px`}}>
            <div className='threel-item-cover box-shadow'>
                <img /> 
            </div>
            <span className='threel-item-title'>Title</span>
            <span className='threel-item-artist'>Artist</span>
        </div>
    )
}

export default ThreelItem;