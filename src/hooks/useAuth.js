import { createContext, useContext, useMemo, useEffect } from "react";
import AuthenticationService from '../services/AuthenticationService';
import StorageService from "../services/StorageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = new AuthenticationService();
    const ss = new StorageService();

    const user = ss.getItem('user');

    useEffect(() => {
        const token = ss.getItem('access_token');
        auth.setAuthorizationHeader(token);
    }, []);

    const login = async (credentials) => {
        return auth.login(credentials);
    };

    const register = async (credentials) => {
        return auth.register(credentials);
    };

    const logout = () => {
        return auth.logout();
    };

    const me = () => {
        return auth.me();
    };

    const value = useMemo(
        () => ({
            user,
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