<template>
  <div class="navbar" id="navbar">
    <div class="container">
      <div class="nav-item">
        <div class="buttons">
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <div v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <a
              v-if="!$auth.isAuthenticated"
              @click="login"
              class="button is-dark"
              ><strong>Sign in</strong></a
            >
            <!-- show logout when authenticated -->
            <a
              v-if="$auth.isAuthenticated"
              @click="logout"
              class="button is-dark"
              ><strong>Log out</strong></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
