import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contentView: {
      title: 'Home', topic: 'Home', content: '## this is home', tags: ['#cloudIntelligence', '#home', '#booyah'],
    },
  },
  getters: {},
  mutations: {
    setContentView(state, title, topic, content, tags) {
      // eslint-disable-next-line no-param-reassign
      state.contentView = {
        title, topic, content, tags,
      };
    },
  },
  actions: {},
});
