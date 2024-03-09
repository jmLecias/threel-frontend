import { createContext, useContext, useMemo, useEffect, useState } from "react";
import StorageService from "../services/StorageService";
import threel_api from "../backend/api";
import { useNavigate, useLocation } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await threel_api.post('/display');
            setData(response.data.artists);
            setResult(response.data.artists);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const verifyArtist = async (id) => {
        const response = await threel_api.post(`/verify-artist/{${id}}`);

    };
    const banUser = async (id) => {

    };
    const unbanUser = async (id) => {

    };
    const deleteUser = async (id) => {
        
    };
    const updateUser = async (id) => {

    };

    const value = useMemo(
        () => ({
            verifyArtist,
        }),
        []
    );
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};