import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contentView: {
      title: 'Home',
      topic: 'Home',
      content: '## this is home',
      tags: ['#cloudIntelligence', '#home', '#booyah'],
    },
  },
  getters: {},
  mutations: {
    setContentView(state, stateObj) {
      const { title } = stateObj;
      const { topic } = stateObj;
      const { content } = stateObj;
      const { tags } = stateObj;
      // eslint-disable-next-line no-param-reassign
      state.contentView = {
        title, topic, content, tags,
      };
    },
  },
  actions: {},
});
