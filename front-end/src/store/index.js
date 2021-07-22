import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: {
      title: 'Home', content: '## this is home', tags: ['#cloudIntelligence', '#home', '#booyah'],
    },
  },
  getters: {},
  mutations: {},
  actions: {},
});
