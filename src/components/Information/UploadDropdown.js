import React, { useState } from 'react';

import { IoMdMusicalNote } from "react-icons/io";
import { FaPodcast } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

import { useArtist } from '../../hooks/useArtist';

const UploadDropdown = ({ icon }) => {
    const { setUploadModal } = useArtist();

    const [isOpen, setIsOpen] = useState(false);

    const handleUpload = (type) => {
        setIsOpen(false);

        setUploadModal(prev => ({...prev,show: true}));

        switch(type) {
            case 1:
                setUploadModal(prev => ({...prev, title: 'Upload Music'}));
                break;
            case 2:
                setUploadModal(prev => ({...prev, title: 'Upload Podcast'}));
                break;
            case 3:
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
                    <div className='upload-dropdown-item' onClick={() => handleUpload(1)}>
                        <IoMdMusicalNote size={18} />
                        <span className='upload-dropdown-text'>Upload Music</span>
                    </div>
                    <div className='upload-dropdown-item' onClick={() => handleUpload(2)}>
                        <FaPodcast size={18} />
                        <span className='upload-dropdown-text'>Upload Podcast</span>
                    </div>
                    <div className='upload-dropdown-item' onClick={() => handleUpload(3)}>
                        <FaVideo size={18} />
                        <span className='upload-dropdown-text'>Upload Videocast</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDropdown;