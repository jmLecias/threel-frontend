import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import AuthenticationService from '../services/AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = new AuthenticationService();
    const navigate = useNavigate();

    const user = auth.getUser();

    useEffect(() => {
        const token = auth.getToken();
        auth.setAuthorizationHeader(token);
    }, []);

    // call this function when you want to authenticate the user
    const login = async (credentials) => {
        auth.login(credentials).then(isLoggedIn => {
            if (isLoggedIn) {
                navigate("/home", { replace: true });
            }
        }).catch(error => {
            alert("Error logging in: " + error);
        });
    };

    const register = async (credentials) => {
        auth.register(credentials).then(isRegistered => {
            if (isRegistered) {
                navigate("/home", { replace: true });
            }
        }).catch(error => {
            alert("Error registering: " + error);
        });
    };

    // call this function to sign out logged in user
    const logout = () => {
        auth.logout().then(isLoggedOut => {
            if (isLoggedOut) {
                navigate("/login", { replace: true });
                auth.removeUser();
            }
        }).catch(error => {
            alert("Error logging out: " + error);
        });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};