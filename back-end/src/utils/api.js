import axios from 'axios';

const api = axios.create({
    baseURL: process.env.APP_API_URL || 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;