import axios from 'axios';

let api = axios.create({
    baseURL: 'https://dev-api.indozone.id',
    withCredentials: true,
});

export default api;
