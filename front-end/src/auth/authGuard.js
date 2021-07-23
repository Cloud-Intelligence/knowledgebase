import { getInstance } from './index';

// eslint-disable-next-line consistent-return
const authGuard = (to, _from, next) => {
  const authService = getInstance();

  // eslint-disable-next-line consistent-return
  const fn = () => {
    if (process.env.NODE_ENV === 'development') {
      authService.isAuthenticated = true;
      authService.user = {
        given_name: 'test_user',
        family_name: 'user',
        nickname: 'testy.testface',
        name: 'testicle test test jr',
        picture: 'https://lh3.googleusercontent.com/a-/AOh14GisixCcwF8PhCe6uxmfPauFVixuq0QW7KVtRTKnTA=s96-c',
        locale: 'en',
        updated_at: '2021-07-23T06:38:29.918Z',
        email: 'test@cloudIntelligence.co.za',
        email_verified: true,
      };
      return next();
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
