<template>
  <section class="Create" id="Create">
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
