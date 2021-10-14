<template>
  <section class="login" id="login">
    <div :class="error_is_hidden? 'error-message hide':'error-message'">
      <div
          v-if="this.error_message"
          class="notification is-danger is-light"
      >
        <button class="delete" @click="removeError(500)"></button>
        {{ this.error }}
      </div>
    </div>
    <div class="login">
      <div class="box">
        <div class="image">
          <img src="../assets/images/CI-Logo.png" alt="Logo image" />
        </div>
        <router-link class="button is-primary is-light" to="/">
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
    setTimeout(() => {
      this.removeError();
    }, 10000);
  },
  methods: {
    removeError(timeout = 1000) {
      this.error_is_hidden = true;
      setTimeout(() => {
        this.error_message = null;
      }, timeout);
    },
  },
};
</script>

<style lang="sass">
  @import '../assets/login.scss'
</style>
