import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import threel_api from "../backend/api";

import { useAuth } from "./useAuth";
import { useUser } from "./useUser";

const ArtistContext = createContext();

export const ArtistProvider = ({ children }) => {

    const location = useLocation();

    const isExplorePage = location.pathname === '/';

    const { user } = useAuth();

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        getArtists();
    }, [isExplorePage, location]);


    const [uploadModal, setUploadModal] = useState({
        show: false,
        title: 'Upload',
        close: 'Cancel Upload',
        action: 'Upload',
        onClose: () => {
            setUploadModal(prev => ({ ...prev, show: false }));
        },
        onAction: () => {
            setUploadModal(prev => ({ ...prev, show: false }));
        },
    });

    const getArtists = async () => {
        try {
            const response = await threel_api.post('/artists');

            const freshArtists = response.data.artists;

            setArtists(freshArtists);
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    }

    const uploadAlbum = async (album) => {
        const albumData = new FormData();
        albumData.append('name', album.name);
        albumData.append('description', album.description);
        albumData.append('cover', album.cover);
        albumData.append('user_id', album.userId);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await threel_api.post('/artist/upload/album', albumData, config);

        if (response.status === 200) {
            return response.data.album;
        } else {
            return false;
        }
    }

    const uploadSingle = async (upload) => {
        const uploadData = new FormData();
        uploadData.append('title', upload.title);
        uploadData.append('description', upload.description);
        uploadData.append('content', upload.content);
        uploadData.append('thumbnail', upload.cover);
        uploadData.append('upload_type', upload.uploadType);
        uploadData.append('user_id', upload.userId);
        uploadData.append('album_id', upload.albumId);
        uploadData.append('duration', upload.duration);
        uploadData.append('visibility', upload.visibility);

        upload.genres.forEach((genre, index) => {
            uploadData.append(`genres[${index}][value]`, genre.value);
            uploadData.append(`genres[${index}][label]`, genre.label);
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await threel_api.post('/artist/upload', uploadData, config);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    const value = useMemo(
        () => ({
            artists,
            uploadModal,
            setUploadModal,
            uploadSingle,
            uploadAlbum,
        }),
        [artists, uploadModal]
    );
    return <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>;
};

export const useArtist = () => {
    return useContext(ArtistContext);
};