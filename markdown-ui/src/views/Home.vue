<template>
  <div class="container">
    <div class="sidebar" id="sidebar">
      <Sidebar :updateContent="updateContent"></Sidebar>
    </div>
    <div class="content" id="content">
      <Content></Content>
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
  methods: {
    updateContent(url) {
      console.log(url);
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

  
</style>