<template>
  <div id="app">
    <sidebar
      v-if="!($route.name == 'login')"
      ref="sidebar"
      :user-name="$auth.user.name"
      :user-image="$auth.user.picture"
      @tray="toggleTray"
    />
    <div :class="collapsed || ($route.name === 'login') ? 'body closed' : 'body open'">
      <div class="layout">
        <router-view :refresh-sidebar="refreshSidebar" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleTray() {
      this.collapsed = !this.collapsed
    },
    refreshSidebar() {
      this.$refs.sidebar.getDocuments()
    }
  }
}
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
    margin: 0;
    overflow-y: hidden;
  }
}
</style>
