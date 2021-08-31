import axios from 'axios';
import { getInstance } from '../auth';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL, // url = base url + request url
  timeout: 15000, // request timeout
});

if (['production'].includes(process.env.NODE_ENV)) {
  const auth0 = getInstance();

  if (auth0.isAuthenticated) {
    // request interceptor
    request.interceptors.request.use(
      async (config) => {
        const newConfig = { ...config };
        const token = await auth0.getTokenSilently();

        if (token) {
          newConfig.headers.Authorization = `Bearer ${token}`;
        }

        return newConfig;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }
}

export default request;
