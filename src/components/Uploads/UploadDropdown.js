import React, { useState } from 'react';

import { IoMdMusicalNote } from "react-icons/io";
import { FaPodcast } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

import { useArtist } from '../../hooks/useArtist';

const UploadDropdown = ({ icon }) => {
    const { setUploadModal } = useArtist();

    const [isOpen, setIsOpen] = useState(false);

    const handleUpload = () => {
        setIsOpen(false);

        setUploadModal(prev => ({...prev,show: true}));
    }

    return (
        <div>
            <div className='header-icons' onClick={() => setIsOpen(!isOpen)}>
                {icon}
            </div>
            {isOpen && (
                <div className='upload-dropdown'>
                    <div className='upload-dropdown-item' onClick={() => handleUpload()}>
                        <IoMdMusicalNote size={18} />
                        <span className='upload-dropdown-text'>Upload Music</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDropdown;