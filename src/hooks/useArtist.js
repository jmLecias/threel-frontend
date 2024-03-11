import { createContext, useContext, useEffect, useMemo, useState } from "react";

import threel_api from "../backend/api";

import { useAuth } from "./useAuth";

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {

    const { user } = useAuth();

    const [uploadModal, setUploadModal] = useState({
        show: false,
        title: '',
        close: 'Cancel Upload',
        action: 'Upload',
        onClose: () => {
            setUploadModal(prev => ({ ...prev, show: false }));
        },
        onAction: (upload) => { 
            submitUpload(upload); 
            setUploadModal(prev => ({ ...prev, show: false }));
        },
    });

    const submitUpload = async (upload) => {
        console.log(upload);

        try {
            const credentials = new FormData();
            credentials.append('title', upload.title);
            credentials.append('description', upload.description);
            credentials.append('content', upload.content); // Assuming credentials.content is a File object
            credentials.append('thumbnail', upload.cover); // Assuming credentials.thumbnail is a File object
            credentials.append('upload_type', upload.uploadType);
            credentials.append('user_id', upload.userId);
        
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            console.log(credentials);
    
            const response = await threel_api.post('/artist/upload', credentials, config);
    
            if (response.status === 200) {
    
                console.log(response);
                
                return true;
            } else {
                return false;
            }
        } catch(error) {
            console.log(error);
        }
    }

    const value = useMemo(
        () => ({
            uploadModal,
            setUploadModal,
        }),
        [uploadModal]
    );
    return <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>;
};

export const useArtist = () => {
    return useContext(ArtistContext);
};