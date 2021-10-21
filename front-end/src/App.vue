<template>
  <div id="app">
    <sidebar
      :user-name="this.$auth.user.name"
      :user-image="this.$auth.user.picture"
      v-on:tray="toggleTray"
      v-if="!(this.$route.name == 'login')"
      ref="sidebar"
    ></sidebar>
    <div :class="collapsed || (this.$route.name == 'login') ? 'body closed' : 'body open'">
      <div class="container">
        <div class="layout">
          <router-view :refreshSidebar="refreshSidebar" />
        </div>
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

<style scoped>

</style>
