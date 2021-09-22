<template>
  <section class="create" id="create">
    <CreateEditDoc :refreshSidebar="refreshSidebar"></CreateEditDoc>
  </section>
</template>

<script>

import CreateEditDoc from '../components/CreateEditDoc.vue';

export default {
  props: {
    refreshSidebar: Function,
  },
  components: {
    CreateEditDoc,
  },
};
</script>

<style lang="sass">
@import '../assets/create-view.scss'
</style>
