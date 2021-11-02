<template>
  <section class="home" id="home">
    <div class="body">
      <transition appear appear-active-class="bounce">
        <img src="../assets/images/CI-Logo.png" class="image">
      </transition>
      <vue-particles color="#4F05BB"
                     :particleOpacity="0.7"
                     :particlesNumber="80"
                     shapeType="edge"
                     :particleSize="4"
                     linesColor="#4F05FF"
                     :linesWidth="1"
                     :lineLinked="true"
                     :lineOpacity="0.4"
                     :linesDistance="150"
                     :moveSpeed="3"
                     :hoverEffect="true"
                     hoverMode="grab"
                     :clickEffect="true"
                     clickMode="push"
      >
      </vue-particles>
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
  position: relative;
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
  z-index: 100;
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

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bounce {
  animation: bounce-in .75s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
