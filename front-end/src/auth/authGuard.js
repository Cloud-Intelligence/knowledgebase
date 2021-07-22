import { getInstance } from './index';

// eslint-disable-next-line consistent-return
const authGuard = (to, _from, next) => {
  const authService = getInstance();

  // eslint-disable-next-line consistent-return
  const fn = () => {
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
