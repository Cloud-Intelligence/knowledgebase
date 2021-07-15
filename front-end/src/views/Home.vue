<template>
  <div class="home" id="home">
    <header>
      <navbar></navbar>
    </header>
    <section class="body" id="body">
      <p>Name: {{$auth.user.given_name}}</p>
      <p>Surname: {{$auth.user.family_name}}</p>
      <p>email: {{$auth.user.email}}</p>
      <p>verified: {{$auth.user.email_verified}}</p>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar
  }
}

</script>

<style lang="scss" scoped>
</style>
