import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import threel_api from "../backend/api";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getUploads();
        getGenres();
    }, [location]);

    const getUploads = async () => {
        try {
            const response = await threel_api.post('/uploads');

            const uploads = response.data.uploads;
            
            setItems(uploads);
        } catch (error) {
            console.error('Error fetching uploads: ', error);
        }
    };

    const getGenres = async () => {
        try {
            const response = await threel_api.post('/genres');

            const genres = response.data.genres;
            
            setGenres(genres);
        } catch (error) {
            console.error('Error fetching genres: ', error);
        }
    };


    const value = useMemo(
        () => ({
            items,
            setItems,
            genres,
            getUploads,
        }),
        [items]
    );
    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => {
    const context = useContext(ItemContext);
    return context;
};