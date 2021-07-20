import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bulma/css/bulma.css';
import { Auth0Plugin } from './auth';

const domain = process.env.VUE_APP_domain;
const clientId = process.env.VUE_APP_clientID;
const audience = process.env.VUE_APP_audience;

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

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
