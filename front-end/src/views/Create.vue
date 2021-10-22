<template>
  <section class="create base-section" id="create">
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

<style lang="scss" scoped>
</style>
