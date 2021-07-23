<template>
  <section :class="collapsed ? 'sidebar closed' : 'sidebar open'" id="sidebar">
    <div class="container">
      <div class="collapse_toggle" @click="toggleTray">
        <uil-angle-left class="icon"></uil-angle-left>
      </div>
      <div class="user child">
        <img :src="this.userImage" alt="user_image" class="user_image" />
        <div class="user_description">
          <p class="title">Cloud intelligence</p>
          <p class="subtitle">{{ userName }}</p>
        </div>
      </div>
      <div class="default_handles child">
        <button class="handle">
          <uil-estate class="icon"></uil-estate> Home
        </button>
        <button class="handle">
          <uil-search class="icon"></uil-search> Search
        </button>
        <button class="handle">
          <uil-star class="icon"></uil-star> Favorites
        </button>
      </div>
      <div class="handles child">
        <p class="subtitle">collections</p>
        <div v-for="topic in topics" class="topic" :key="topic.name">
          <button
            class="handle"
            :id="topic.name"
            @click="toggleAccordion(topic.name)"
          >
            {{ topic.name }}
            <span class="drop_down icon"
              ><uil-angle-down></uil-angle-down
            ></span>
          </button>
          <div class="children collapsed">
            <button v-for="child in topic.content" class="handle" :key="child">
              {{ child }}
            </button>
          </div>
        </div>
      </div>
      <button class="add_record button">+</button>
    </div>
  </section>
</template>

<script>
import {
  UilEstate,
  UilSearch,
  UilStar,
  UilAngleLeft,
  UilAngleDown,
} from '@iconscout/vue-unicons';

export default {
  name: 'Sidebar',
  data() {
    return {
      collapsed: false,
      topics: null,
    };
  },
  props: {
    userName: String,
    userImage: String,
  },
  created() {
    // eslint-disable-next-line vue/no-mutating-props
    this.userName = this.$auth.user.name;
    // eslint-disable-next-line vue/no-mutating-props
    this.userImage = this.$auth.user.picture;
    // fetch the topics from mirage
    fetch('/api/topics')
      .then((res) => res.json())
      .then((json) => {
        this.topics = json.topics;
      });
  },
  components: {
    UilEstate,
    UilSearch,
    UilStar,
    UilAngleLeft,
    UilAngleDown,
  },
  methods: {
    toggleTray() {
      this.collapsed = !this.collapsed;
      this.$emit('tray');
    },
    toggleAccordion(id) {
      const toggle = document.getElementById(id);
      toggle.classList.toggle('active');
      const children = toggle.nextElementSibling;
      if (children.style.maxHeight) {
        children.style.maxHeight = null;
      } else {
        children.style.maxHeight = `${children.scrollHeight}px`;
      }
    },
  },
};
</script>

<style lang="sass">
  @import '../assets/sidebar.scss'
</style>
