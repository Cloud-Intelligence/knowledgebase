<template>
  <section class="login" id="login">
    <div :class="error_is_hidden? 'error-message hide':'error-message'">
      <div
          v-if="error_message"
          class="notification is-danger is-light"
      >
        {{ error_message }}
      </div>
    </div>
    <div class="login">
      <div class="box">
        <div class="image">
          <img src="../assets/images/CI-Logo.png" alt="Logo image" />
        </div>

        <button
            v-if="error_message"
            class="button is-primary is-light"
            @click="logout">
          Logout
        </button>

        <router-link v-else class="button is-primary is-light" to="/">
          login
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  props: ['error'],
  data() {
    return {
      error_message: null,
      error_is_hidden: false,
    };
  },
  created() {
    if (this.error) {
      this.error_message = this.error;
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: `${window.location.origin}/login`,
        client_ID: process.env.VUE_APP_CLIENT_ID,
      });
    },
  },
};
</script>

<style lang="sass">
  @import '../assets/login.scss'
</style>
