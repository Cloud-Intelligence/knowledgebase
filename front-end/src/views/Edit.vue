<template>
    <CreateEditDoc :refreshSidebar="refreshSidebar" :pk="id" id="edit"></CreateEditDoc>
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
};
</script>
