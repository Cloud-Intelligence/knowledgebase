import axios from 'axios'
import { Auth0Client } from '@auth0/auth0-spa-js'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL, // url = base url + request url
  timeout: 15000 // request timeout
})

if (['production'].includes(process.env.NODE_ENV)) {
  const auth0 = new Auth0Client({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_CLIENT_ID,
    audience: process.env.VUE_APP_AUDIENCE
  })

  // request interceptor
  request.interceptors.request.use(
    async(config) => {
      const newConfig = { ...config }
      const token = await auth0.getTokenSilently()

      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`
      }

      return newConfig
    },
    (error) => Promise.reject(error) // TODO: trigger logout action
  )
}

export default request
