<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <CreateEditDoc :refreshSidebar="refreshSidebar" :id="id"></CreateEditDoc>
      </div>
    </div>
  </section>
</template>

<script>

import CreateEditDoc from '../components/CreateEditDoc.vue';

export default {
  name: 'Edit',
  props: {
    refreshSidebar: Function,
    id: String,
  },
  components: {
    CreateEditDoc,
  },
  created() {
    console.log(this.id);
  },
};
</script>
