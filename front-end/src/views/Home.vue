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
      <p>{{token}}</p>
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data() {
    return {
      token: null,
    };
  },
  methods: {
    async callAPI() {
      this.token = await this.$auth.getTokenSilently();
    },
  },
  async mounted() {
    await this.callAPI();
  },
};

</script>

<style lang="scss" scoped>
</style>
