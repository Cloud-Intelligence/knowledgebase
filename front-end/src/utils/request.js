import axios from 'axios';
import { Auth0Client } from '@auth0/auth0-spa-js';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL, // url = base url + request url
  timeout: 15000, // request timeout
});

if (['production'].includes(process.env.NODE_ENV)) {
  const auth0 = new Auth0Client({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_CLIENT_ID,
  });

  // request interceptor
  service.interceptors.request.use(
    async (config) => {
      const newConfig = { ...config };
      const token = await auth0.getTokenSilently();

      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return newConfig;
    },
    (error) => {
      console.error(error); // for debug
      return Promise.reject(error);
    },
  );
}

export default service;
