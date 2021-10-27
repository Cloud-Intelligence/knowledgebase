<template>
  <section
    v-if="$auth.isAuthenticated"
    id="sidebar"
    :class="collapsed ? 'sidebar closed' : 'sidebar open'"
  >
    <div class="collapse_toggle" @click="toggleTray">
      <uil-angle-left class="icon" />
    </div>

    <div class="user sidebar-item">
      <img :src="userImage" alt="user_image" class="user_image">
      <div class="user_description">
        <p class="title">Cloud intelligence</p>
        <p class="subtitle">{{ userName }}</p>
      </div>
    </div>

    <div class="default_handles sidebar-item">
      <router-link id="Home" to="/" class="handle">
        <uil-estate class="icon" /> Home
      </router-link>
      <router-link id="Search" to="/search" class="handle">
        <uil-search class="icon" /> Search
      </router-link>
      <router-link id="Favorites" to="/favorites" class="handle">
        <uil-star class="icon" /> Favorites
      </router-link>
    </div>

    <div class="handles sidebar-item">
      <p class="subtitle">Collections</p>
      <div v-if="loading" class="loading">
        <Spinner line-fg-color="#000000" />
      </div>

      <div v-for="(children, topic) in topics" v-else :key="topic" class="topic">
        <button :id="topic" class="handle" @click="toggleAccordion(topic)">
          {{ topic }}
          <span
            class="drop_down icon"
          ><uil-angle-down /></span>
        </button>
        <div class="children collapsed">
          <router-link
            v-for="child in children"
            :id="child.id"
            :key="child.id"
            class="handle"
            :to="'/documents/' + child.id"
          >
            {{ child.title }}
          </router-link>
        </div>
      </div>
    </div>

    <router-link class="add_record" to="/create">
      <uil-plus-circle class="icon" />
    </router-link>
    <button class="logout" @click="logout()">
      <uil-signout class="icon" />
    </button>
  </section>
</template>

<script>
import {
  UilEstate,
  UilSearch,
  UilStar,
  UilAngleLeft,
  UilAngleDown,
  UilPlusCircle,
  UilSignout
} from '@iconscout/vue-unicons'

import Spinner from 'vue-simple-spinner'

import { listDocuments } from '../api/documents'

export default {
  name: 'Sidebar',
  components: {
    UilEstate,
    UilSearch,
    UilStar,
    UilAngleLeft,
    UilAngleDown,
    UilPlusCircle,
    UilSignout,
    Spinner
  },
  props: {
    userName: String,
    userImage: String,
    bus: Object
  },
  data() {
    return {
      collapsed: false,
      topics: {},
      loading: false
    }
  },
  created() {
    this.getDocuments()
  },
  methods: {
    toggleTray() {
      this.collapsed = !this.collapsed
      this.$emit('tray')
    },
    toggleAccordion(id) {
      const toggle = document.getElementById(id)
      toggle.classList.toggle('active')
      const children = toggle.nextElementSibling
      if (children.style.maxHeight) {
        children.style.maxHeight = null
      } else {
        children.style.maxHeight = `${children.scrollHeight}px`
      }
    },
    async getDocuments() {
      this.loading = true
      // fetch the topics from mirage
      const resp = await listDocuments()
      const files = resp.data
      const tmp = {}
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        const fileTopic = files[i].topic
        if (fileTopic in tmp) {
          tmp[fileTopic].push(files[i])
        } else {
          tmp[fileTopic] = []
          tmp[fileTopic].push(files[i])
        }
      }
      this.topics = tmp
      this.loading = false
    },
    logout() {
      this.$auth.logout({
        returnTo: `${window.location.origin}/login`,
        client_ID: process.env.VUE_APP_CLIENT_ID
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/sidebar';
</style>
