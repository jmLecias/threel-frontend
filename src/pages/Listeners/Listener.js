import React, { useState, useEffect } from 'react';
import ListenerHeader from '../../components/Information/ListenerHeader';
import ListenerSidebar from '../../components/Navigation/ListenerSidebar';
import UploadModal from '../../components/Information/UploadModal';

import ListenerExplore from './ListenerExplore';


import { useAuth } from "../../hooks/useAuth";
import { useArtist } from '../../hooks/useArtist';


const Listener = ({ content }) => {
    const { user } = useAuth();
    const { uploadModal } = useArtist();

    return (
        <>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listener;
