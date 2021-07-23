<template>
  <section class="main" id="main">
      <div class="container">
          <p>{{$auth.user}}</p>
      </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="sass">
  @import '../assets/content-view.scss'
</style>
