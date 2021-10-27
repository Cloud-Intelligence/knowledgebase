<template>
  <CreateEditDoc id="create" :refresh-sidebar="refreshSidebar" />
</template>

<script>

import CreateEditDoc from '../components/CreateEditDoc.vue'

export default {
  components: {
    CreateEditDoc
  },
  props: {
    refreshSidebar: Function
  }
}
</script>
