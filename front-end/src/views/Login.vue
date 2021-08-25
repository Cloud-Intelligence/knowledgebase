<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="error-message">
          <div
            v-if="this.error_message"
            ref="error-message"
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  props: {
    error: String,
  },
  data() {
    return {
      error_message: null,
    };
  },
  created() {
    this.error_message = this.error;
    setTimeout(() => {
      this.removeError();
    }, 10000);
  },
  methods: {
    removeError(timeout = 1000) {
      this.$refs.error_message.classList.toggle('hide');
      setTimeout(() => {
        this.error_message = null;
      }, timeout);
    },
  },
};
</script>

<style>
#main .error-message {
  position: fixed;
  width: 100%;
  left: 0;
  top: 1rem;
  display: flex;
  justify-content: center;
  transition: top 0.5s;
}

#main .error-message.hide {
  top: -10rem;
}

#main .error-message .notification {
  max-width: 25rem;
}

#main .login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#main .login .box {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#main .login .box .image {
  width: 45%;
  min-width: 3rem;
  margin-bottom: 5rem;
}
</style>
