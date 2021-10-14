import { getInstance } from './index';

// eslint-disable-next-line consistent-return
const authGuard = (to, _from, next) => {
  const authService = getInstance();

  // eslint-disable-next-line consistent-return
  const fn = () => {
    if (process.env.VUE_APP_AUTH0_ENABLED === '0') {
      authService.isAuthenticated = true;
      authService.user = {
        given_name: 'test_user',
        family_name: 'user',
        nickname: 'testy.testface',
        name: 'testicle test test jr',
        picture: 'https://example.com',
        locale: 'en',
        updated_at: '2021-07-23T06:38:29.918Z',
        email: 'test@cloudIntelligence.co.za',
        email_verified: true,
      };
      return next();
    }
    if (to.query.error) {
      authService.isAuthenticated = false;
      return authService.logout({
        returnTo: `${window.location.origin}/login?error=${to.query.error_description}`,
        client_ID: process.env.VUE_APP_CLIENT_ID,
      });
    }
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }
    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check the auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before checking isAuthenticated
  // eslint-disable-next-line consistent-return
  authService.$watch('loading', (loading) => {
    if (loading === false) {
      return fn();
    }
  });
};

export default authGuard;
