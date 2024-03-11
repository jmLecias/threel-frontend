import axios from 'axios';
import StorageService from '../services/StorageService';

const ss = new StorageService();

const threel_api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
});

const refreshToken = async () => {
    try {
        const response = await threel_api.post('/refresh', null, {
            headers: {
                'Authorization': `Bearer ${ss.getItem('access_token')}`
            }
        });

        const newAccessToken = response.data.access_token;
        const user = response.data.user;
        ss.storeItem('access_token', newAccessToken);
        ss.storeItem('user', JSON.stringify(user));

        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
    }
};

threel_api.interceptors.request.use(
    config => {
        const token = ss.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

threel_api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;

        //     try {
        //         const newAccessToken = await refreshToken();

        //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //         return threel_api(originalRequest);
        //     } catch (refreshError) {
        //         // Handle refresh token failure (e.g., redirect to login page)
        //         console.error('Failed to refresh token:', refreshError);
        //     }
        // }
        return Promise.reject(error);
    }
);

export default threel_api;
