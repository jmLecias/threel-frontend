import { createContext, useContext, useMemo, useState } from "react";

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {
    const [uploadModal, setUploadModal] = useState({
        show: false,
        title: '',
        close: 'Cancel Upload',
        action: 'Upload',
        onClose: () => {setUploadModal(prev => ({...prev, show: false})) },
        onAction: () => { },    
    });

    const [upload, setUpload] = useState({
        type: null,
        title: '',
        description: '',
        thumbnail: null,
        content: null,
    });

    const value = useMemo(
        () => ({
            uploadModal,
            setUploadModal,
            upload,
            setUpload
        }),
        [uploadModal, upload]
    );
    return <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>;
};

export const useArtist = () => {
    return useContext(ArtistContext);
};