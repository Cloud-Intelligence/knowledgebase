<template>
  <section class="home" id="home">
    <div class="body">
      <img src="../assets/images/CI-Logo.png" class="image">
      <p>Welcome to the cloud intelligence wiki</p>
      <p>Feel free to view and add documents throughout your journey</p>
    </div>
    <div class="footer">
      <p>Made with love by the cloud intelligence team</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: var(--font-colour);
}

.image {
  width: 50%;
  max-width: 600px;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--body-colour);
  width: 100%;
  height: 5%;
  text-align: center;
  color: var(--font-colour);
}

</style>
