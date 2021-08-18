<template>
  <section
    v-if="$auth.isAuthenticated"
    :class="collapsed ? 'sidebar closed' : 'sidebar open'"
    id="sidebar"
  >
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
        <router-link to="/" class="handle" id="Home" >
          <uil-estate class="icon"></uil-estate> Home
        </router-link>
        <router-link to="/search" class="handle" id="Search" >
          <uil-search class="icon"></uil-search> Search
        </router-link>
        <router-link to="/favorites" class="handle" id="Favorites" >
          <uil-star class="icon"></uil-star> Favorites
        </router-link>
      </div>
      <div class="handles child">
        <p class="subtitle">collections</p>
        <div v-for="(children, topic) in topics" class="topic" :key="topic">
          <button
            class="handle"
            :id="topic"
            @click="toggleAccordion(topic)"
          >
            {{ topic }}
            <span class="drop_down icon"
              ><uil-angle-down></uil-angle-down
            ></span>
          </button>
          <div class="children collapsed">
            <router-link
              v-for="child in children"
              class="handle"
              :to="'/documents/'+child.id"
              :key="child.id"
              :id="child.id"
            >
              {{ child.title }}
            </router-link>
          </div>
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <div class="logout">
        <button class="button" @click="logout">Logout</button>
      </div>
>>>>>>> 279b803 (created login redirect and route guarding fixes)
      <router-link class="add_record button" to="/create"><uil-plus></uil-plus></router-link>
=======
      <router-link class="add_record button" to="/create">+</router-link>
>>>>>>> 1e96037 (added router link to sidebar to navigate)
=======
      <router-link class="add_record button" to="/create"><uil-plus></uil-plus></router-link>
>>>>>>> d2e2d70 (added icon for plus and styled the quill div for validation)
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
  UilPlus,
} from '@iconscout/vue-unicons';

import { listDocuments } from '../api/documents';

export default {
  name: 'Sidebar',
  data() {
    return {
      collapsed: false,
      topics: {},
    };
  },
  props: {
    userName: String,
    userImage: String,
    bus: Object,
  },
  created() {
    this.getDocuments();
  },
  components: {
    UilEstate,
    UilSearch,
    UilStar,
    UilAngleLeft,
    UilAngleDown,
    UilPlus,
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
    async getDocuments() {
      // fetch the topics from mirage
      const resp = await listDocuments();
      const files = resp.data;
      const tmp = {};
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        const fileTopic = files[i].topic;
        if (fileTopic in tmp) {
          tmp[fileTopic].push(files[i]);
        } else {
          tmp[fileTopic] = [];
          tmp[fileTopic].push(files[i]);
        }
      }
      this.topics = tmp;
    },
    logout() {
      this.$auth.logout({
        returnTo: `${window.location.origin}/login`,
        clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
      });
    },
  },
};
</script>

<style lang="sass">
@import '../assets/sidebar.scss'
</style>
