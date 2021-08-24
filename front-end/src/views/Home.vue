<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <h1>Home component</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  mouted() {
    if (this.$auth.error) {
      this.$router.push(`/login?error=${this.$auth.error}`);
    }
  },
};
</script>
