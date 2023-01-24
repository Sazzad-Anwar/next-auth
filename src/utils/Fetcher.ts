import api from './AxiosInstance';

export const Fetcher = (url: string) => api.get(url).then((res) => res.data);
