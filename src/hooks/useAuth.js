import { createContext, useContext, useMemo, useEffect, useState } from "react";
import StorageService from "../services/StorageService";
import threel_api from "../backend/api";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const ss = new StorageService();

    const location = useLocation();

    var user = ss.getItem('user');

    if (user) {
        user = JSON.parse(user);
    }

    const [home, setHome] = useState("/");

    useEffect(() => {

    }, [location]);

    const login = async (credentials) => {
        const response = await threel_api.post('/login', credentials);

        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;

            console.log(user);

            ss.storeItem('access_token', accessToken);
            ss.storeItem('user', JSON.stringify(user));
            
            return true;
        } else {
            return false;
        }
    };

    const register = async (credentials) => {
        const response = await threel_api.post('/register', credentials);

        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;

            ss.storeItem('access_token', accessToken);
            ss.storeItem('user', JSON.stringify(user));

            return true;
        } else {
            return false;
        }
    };

    const logout = async () => {
        const response = await threel_api.post('/logout');
        
        ss.removeItem('access_token');
        ss.removeItem('user');
        
        if (response.status === 200) {

            return true;
        } else {
            return false;
        }
    };

    const me = async () => {
        const response = await threel_api.post('/me');

        if (response.status === 200) {
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));

            return response;
        } else {
            return response;
        }
    };

    const value = useMemo(
        () => ({
            user,
            home,
            login,
            register,
            logout,
            me,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};