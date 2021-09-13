<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <CreateEditDoc :refreshSidebar="refreshSidebar"></CreateEditDoc>
      </div>
    </div>
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
