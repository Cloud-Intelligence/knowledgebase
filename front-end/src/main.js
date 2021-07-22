import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bulma/css/bulma.css';

//declare the auth0 vars
const domain = process.env.VUE_APP_domain;
const clientId = process.env.VUE_APP_clientID
const audience = process.env.VUE_APP_audience
// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

import { makeServer } from "./Server.js"

if (process.env.NODE_ENV === "development") {
  makeServer()
}


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
