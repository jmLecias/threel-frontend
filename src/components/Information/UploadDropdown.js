import React, { useState } from 'react';

import { IoMdMusicalNote } from "react-icons/io";
import { FaPodcast } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

import { useArtist } from '../../hooks/useArtist';

const UploadDropdown = ({ icon }) => {
    const { setUpload, setUploadModal } = useArtist();

    const [isOpen, setIsOpen] = useState(false);

    const handleUpload = (type) => {
        setIsOpen(false);

        setUploadModal(prev => ({...prev,show: true}));
        setUpload(prev => ({...prev, type: type}));

        switch(type) {
            case 'music':
                setUploadModal(prev => ({...prev, title: 'Upload Music'}));
                break;
            case 'podcast':
                setUploadModal(prev => ({...prev, title: 'Upload Podcast'}));
                break;
            case 'videocast':
                setUploadModal(prev => ({...prev, title: 'Upload Videocast'}));
                break;
        }
    }

    return (
        <div>
            <div className='header-icons' onClick={() => setIsOpen(!isOpen)}>
                {icon}
            </div>
            {isOpen && (
                <div className='upload-dropdown'>
                    <div className='upload-dropdown-item' onClick={() => handleUpload('music')}>
                        <IoMdMusicalNote size={18} />
                        <span className='upload-dropdown-text'>Upload Music</span>
                    </div>
                    <div className='upload-dropdown-item' onClick={() => handleUpload('podcast')}>
                        <FaPodcast size={18} />
                        <span className='upload-dropdown-text'>Upload Podcast</span>
                    </div>
                    <div className='upload-dropdown-item' onClick={() => handleUpload('videocast')}>
                        <FaVideo size={18} />
                        <span className='upload-dropdown-text'>Upload Videocast</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDropdown;