import axios from 'axios';
import api from './AxiosInstance';
// let api = axios.create({
//     withCredentials: true,
// });
export const Fetcher = (url: string) => api.get(url).then((res) => res.data);
