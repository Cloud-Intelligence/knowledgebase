<template>
  <section id="login" class="login">
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
          <img src="../assets/images/CI-Logo.png" alt="Logo image">
        </div>

        <button
          v-if="error_message"
          class="button is-primary is-light"
          @click="logout"
        >
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
  name: 'Login',
  props: ['error'],
  data() {
    return {
      error_message: null,
      error_is_hidden: false
    }
  },
  created() {
    if (this.error) {
      this.error_message = this.error
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: `${window.location.origin}/login`,
        client_ID: process.env.VUE_APP_CLIENT_ID
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  .error-message {
    position: fixed;
    width: 100%;
    left: 0;
    top: 1rem;
    display: flex;
    justify-content: center;
    transition: top 0.5s;
  }

  .error-message.hide {
    top: -10rem;
  }

  .error-message .notification {
    max-width: 25rem;
  }

  .login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .box {
      max-width: 40rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .image {
        width: 45%;
        min-width: 3rem;
        margin-bottom: 5rem;
      }
    }
  }
}
</style>
