import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import ListenerHeader from '../../components/Information/ListenerHeader';
import ListenerSidebar from '../../components/Navigation/ListenerSidebar';
import UploadModal from '../../components/Information/UploadModal';

import ListenerExplore from './ListenerExplore';
import ListenerPlayer from './ListenerPlayer';


import { useAuth } from "../../hooks/useAuth";
import { useArtist } from '../../hooks/useArtist';


const Listener = ({ content }) => {
    const { user } = useAuth();
    const { uploadModal } = useArtist();

    return (
        <div>
            <ToastContainer />
            <UploadModal
                action={uploadModal.action}
                title={uploadModal.title}
                show={uploadModal.show}
                close={uploadModal.close}
                onClose={uploadModal.onClose}
                onAction={uploadModal.onAction}
            />
            <div className="listener-main-container" >
                <ListenerHeader isLoggedIn={user} />

                <div className='listener-container'>
                    <ListenerSidebar />

                    <div className='listener-content'>
                        {content === 'explore' && <ListenerExplore />}
                        {content === 'search' && <ListenerExplore />}
                        {content === 'play' && <ListenerPlayer />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listener;