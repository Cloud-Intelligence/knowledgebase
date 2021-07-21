<template>
  <div class="body">
      <section :class="sidebar" id="sidebar">
          <div class="container">
              <div class="user child">
                <img :src="this.userImage" alt="user_image" class="user_image">
                <div class="user_description">
                    <p class="title">Cloud intelligence</p>
                    <p class="subtitle">{{userName}}</p>
                </div>
              </div>
              <div class="default_handles child">
                  <button class="handle"><uis-house-user class="icon"></uis-house-user> <span>Home</span></button>
              </div>
              <div class="handles child">
                  <p class="subtitle">collections</p>
              </div>
          </div>
      </section>
      <section class="main" id="main">
          <div class="container">
              <p>{{$auth.user}}</p>
              <p v-text="windowWidth"></p>
          </div>
      </section>
  </div>
</template>

<script>
import { UisHouseUser } from '@iconscout/vue-unicons-solid';
export default {
    name: 'Wiki',
    data() {
        return {
            userName: null,
            userImage: null,
            windowWidth: window.innerWidth
        }
    },
    created() {
        this.userName = this.$auth.user.name;
        this.userImage = this.$auth.user.picture;
    },
    components: {
        UisHouseUser
    }
}
</script>