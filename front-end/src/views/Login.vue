<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="login">
          <div class="box">
            <div class="image">
              <img src="../assets/images/CI-Logo.png" alt="Logo image">
            </div>
          <router-link to="/">
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
};
</script>

<style>
#main .login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
