import threel_api from './api';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

class AuthenticationService {
    constructor() {
        this.threel_api = threel_api;
    }

    async login(credentials) {
        const response = await this.threel_api.post('/login', credentials);
        
        if (response.status === 200) {
            const accessToken = response.data.access_token;
    
            this.storeToken(accessToken);
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

            this.storeToken(accessToken);
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
    
    storeToken(token) {
        try {
            ls.set('access_token', token);
        } catch (error) {
            console.error('Error storing token:', error);
            // Handle storage failure (e.g., display error message or retry)
        }
    }
    
    async getToken() {
        try {
            const token = await ls.get('access_token');
            return token;
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    }
    
    async removeToken() {
        try {
            await ls.remove('access_token');
        } catch (error) {
            console.error('Error removing token:', error);
            // Handle removal failure (e.g., log or ignore)
        }
    }


}

export default AuthenticationService;
