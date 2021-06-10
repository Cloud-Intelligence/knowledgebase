<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar @clicked="showNewPage"></Sidebar>
    </div>
    <div class="content">
      <Content :url="currentUrl"></Content>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import Sidebar from '@/components/home/Sidebar.vue';
import Content from '@/components/home/Content.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
    Content
  },
  data() {
    return {
      currentUrl: null
    }
  },
  methods: {
    showNewPage(url) {
      this.currentUrl = url;
    }
  }
}
</script>

<style>
  
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;
  }
  .content {
      background-color: #1b262c;
      width: 100%;
      overflow-y: scroll;
  }

  .sidebar {
    background-color: #0f4c75;
    width: 20vw;
    padding: 10px;
  }

  
</style>