import threel_api from '../backend/api';
import StorageService from './StorageService';

const ss = new StorageService();

class AuthenticationService {
    constructor() {
        this.threel_api = threel_api;
    }

    async logout() {
        const response = await this.threel_api.post('/logout');

        if (response.status === 200) {
            ss.removeItem('access_token');
            ss.removeItem('user');
            return true;
        } else {
            return false;
        }
    }

    async login(credentials) {
        const response = await this.threel_api.post('/login', credentials);
        
        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;
    
            ss.storeItem('access_token', accessToken);
            ss.storeItem('user', JSON.stringify(user));
            this.setAuthorizationHeader(accessToken);
    
            return true;
        } else {
            return false;
        }
    }

    async register(credentials) {
        const response = await this.threel_api.post('/register', credentials);
        
        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;
    
            ss.storeItem('access_token', accessToken);
            ss.storeItem('user', JSON.stringify(user));
            this.setAuthorizationHeader(accessToken);

            return true;
        } else {
            return false;
        }
    }

    setAuthorizationHeader(token) {
        if (token) {
            this.threel_api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Handle cases where token is not available or invalid
        }
    }
}

export default AuthenticationService;
