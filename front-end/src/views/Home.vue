<template>
  <section class="home" id="home">
    <h1>Home component</h1>
  </section>
</template>

<script>
export default {
  name: 'Home',
  mouted() {
    if (this.$auth.error) {
      this.$router.push({ name: 'login', params: { error: this.$auth.error } });
    }
  },
};
</script>
