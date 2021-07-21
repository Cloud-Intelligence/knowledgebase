<template>
  <div id="app">
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
    <router-view/>
  </div>
</template>

<style src="./assets/Styles.css">
</style>
