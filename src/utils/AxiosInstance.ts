import axios from 'axios';
import Cookies from 'js-cookie';

let api = axios.create({
    baseURL: 'https://dev-api.indozone.id',
    withCredentials: true,
    headers: {
        authorization: 'Bearer ' + Cookies.get('token'),
    },
});

export default api;
