import axios from 'axios';
import { Auth0Client } from '@auth0/auth0-spa-js';
import Router from '../router';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL, // url = base url + request url
  timeout: 15000, // request timeout
});

if (['production'].includes(process.env.NODE_ENV)) {
  try {
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
      (error) => Promise.reject(error),
    );
  // eslint-disable-next-line no-empty
  } catch (error) {
    Router.push(`/login?error=${error}`);
  }
}

export default service;
