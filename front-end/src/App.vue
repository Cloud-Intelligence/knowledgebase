<template>
  <div id="app">
    <sidebar
      :user-name="this.$auth.user.name"
      :user-image="this.$auth.user.picture"
      v-on:tray="toggleTray"
      v-if="!(this.$route.name == 'login')"
      ref="sidebar"
    ></sidebar>
    <div :class="collapsed || (this.$route.name === 'login') ? 'body closed' : 'body open'">
      <div class="layout">
        <router-view :refreshSidebar="refreshSidebar" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    toggleTray() {
      this.collapsed = !this.collapsed;
    },
    refreshSidebar() {
      this.$refs.sidebar.getDocuments();
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;

  .body {
    margin-left: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    transition: all .5s;

    &.open {
      width: calc(100vw - 300px);
      margin-left: 300px;
    }

    &.closed {
      width: 100vw;
    }
  }

  .layout {
    height: 100%;
    width: 100%;
    //padding: 1rem 50px;
    margin: 0;
    overflow-y: hidden;
  }
}
</style>
