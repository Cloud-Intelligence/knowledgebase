import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bulma/css/bulma.css';

//declare the auth0 vars
let domain = process.env.VUE_APP_domain;
let clientId = process.env.VUE_APP_clientID

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
