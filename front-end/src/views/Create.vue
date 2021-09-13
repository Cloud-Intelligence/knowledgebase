<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <create_-edit_doc></create_-edit_doc>
      </div>
    </div>
  </section>
</template>

<script>
import Create_Edit_doc from "@/components/Create_Edit_doc";
export default {
  props: {
    refreshSidebar: Function,
  },
  components: {
    Create_Edit_doc,
  },
}
</script>
