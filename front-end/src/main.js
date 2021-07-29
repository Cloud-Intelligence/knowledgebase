import { VueShowdown } from 'vue-showdown';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bulma/css/bulma.css';

// Import the plugin here
import { Auth0Plugin } from './auth';

// eslint-disable-next-line import/extensions
// import { makeServer } from './Server.js';

// declare the auth0 vars
const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_CLIENT_ID;
const audience = process.env.VUE_APP_AUDIENCE;

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

<<<<<<< HEAD
<<<<<<< HEAD
if (process.env.NODE_ENV === 'development') {
  makeServer({ bypass: domain });
}
=======
=======
Vue.component('VueShowdown', VueShowdown);

>>>>>>> 6c02799 (finished frame for home page as a reference for other pages until backend implemented)
// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }
>>>>>>> 220af43 (added state for content view  to vuex data store and displayed it on home page)

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
