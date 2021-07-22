<template>
  <div id="app">
    <sidebar
      :userName="this.$auth.user.name"
      :userImage="this.$auth.user.picture"
      v-on:tray="toggleTray"
    ></sidebar>
    <div :class="collapsed ? 'body closed' : 'body open'">
      <router-view />
    </div>
  </div>
</template>

<style src="./assets/Styles.css">
</style>

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
  },
};
</script>
