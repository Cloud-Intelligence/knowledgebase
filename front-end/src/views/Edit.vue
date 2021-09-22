<template>
  <section class="edit" id="edit">
    <CreateEditDoc :refreshSidebar="refreshSidebar" :id="id"></CreateEditDoc>
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

<style lang="scss">
@import '../assets/edit-view.scss';
</style>
