<template>
  <CreateEditDoc id="edit" :refresh-sidebar="refreshSidebar" :pk="id" />
</template>

<script>

import CreateEditDoc from '../components/CreateEditDoc.vue'

export default {
  name: 'Edit',
  components: {
    CreateEditDoc
  },
  props: {
    refreshSidebar: {
      type: Function,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  }
}
</script>
