import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bulma/css/bulma.css';

// eslint-disable-next-line import/order
import VueQuillEditor from 'vue-quill-editor';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css'; // import styles
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'; // for snow theme
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.bubble.css'; // for bubble theme

// Import the plugin here
import { Auth0Plugin } from './auth';

// eslint-disable-next-line import/extensions
import { makeServer } from './Server.js';

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

// Use the quill editor globally
Vue.use(VueQuillEditor);

if (process.env.VUE_APP_MOCK_SERVER_ENABLED === '1') {
  makeServer({ bypass: domain });
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
