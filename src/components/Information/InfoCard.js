import React, { useState, useEffect } from 'react';

const InfoCard = ({ title, content }) => {
    return (
        <div className='infocard box-shadow'>
            <h5 className='pb-3'>{title}</h5>
            <h2>{content}</h2>
        </div>
    )
}

export default InfoCard;