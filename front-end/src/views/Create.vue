<template>
    <CreateEditDoc :refreshSidebar="refreshSidebar" id="create"></CreateEditDoc>
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
