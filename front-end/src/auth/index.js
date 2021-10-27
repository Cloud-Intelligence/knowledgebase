import Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'

/** Define a default action to perform after authentication */
// eslint-disable-next-line max-len
const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname)

let instance

export const getInstance = () => instance

export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance

  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        token: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      }
    },

    async created() {
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri
      })

      try {
        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback()

          // Notify subscribers that the redirect callback has happened, passing the appState
          onRedirectCallback(appState)
        }
      } catch (e) {
        this.error = e
      } finally {
        // Initialize the internal authentication state
        this.isAuthenticated = await this.auth0Client.isAuthenticated()
        this.user = await this.auth0Client.getUser()
        this.loading = false
      }
    },
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o) {
        this.popupOpen = true

        try {
          await this.auth0Client.loginWithPopup(o)
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        } finally {
          this.popupOpen = false
        }

        this.user = await this.auth0Client.getUser()
        this.isAuthenticated = true
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true
        try {
          await this.auth0Client.handleRedirectCallback()
          this.user = await this.auth0Client.getUser()
          // this.token = await this.auth0Client.getTokenSilently(this.user);
          this.isAuthenticated = true
        } catch (e) {
          this.error = e
        } finally {
          this.loading = false
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o)
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o)
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o)
      },
      /** Gets the access token using a popup window */

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o)
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        return this.auth0Client.logout(o)
      }
    }
  })

  return instance
}

export const Auth0Plugin = {
  // eslint-disable-next-line no-shadow
  install(Vue, options) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$auth = useAuth0(options)
  }
}
