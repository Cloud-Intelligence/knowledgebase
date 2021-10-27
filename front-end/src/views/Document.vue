<template>
  <section id="document" class="document">
    <transition name="fade">
      <div v-if="loading" class="loading is-overlay">
        <Spinner line-fg-color="#000000" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showDeleteForm" class="delete-container is-overlay">
        <div class="form">
          <h1>Are you sure you want to delete this document?</h1>
          <div class="columns">
            <button class="button column is-info" @click="deleteDoc">Yes</button>
            <button class="button column is-info" @click="cancelDelete">No</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="topic-navbar">
      Topic name
    </div>
    <div class="title-bar">
      <div class="head">
        <h1 class="title">{{ title }}</h1>
      </div>
      <div class="container icons">
        <div class="trash" @click="showDelete">
          <uil-trash-alt />
        </div>
        <div class="edit" @click="editDoc">
          <uil-edit class="edit" />
        </div>
        <div class="star">
          <uil-star class="star" />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="text" v-html="content" />
      <div class="tags">
        <p
          v-for="tag in tags"
          :key="tag"
          class="tag"
          :style="getBackgroundColor(tag)"
        >
          {{ tag }}
        </p>
      </div>
    </div>

  </section>
</template>

<script>
import { UilTrashAlt, UilEdit, UilStar } from '@iconscout/vue-unicons'
import Spinner from 'vue-simple-spinner'
import { deleteDocument, getDocument } from '../api/documents'

export default {
  name: 'Document',
  components: {
    UilTrashAlt,
    UilEdit,
    UilStar,
    Spinner
  },
  props: {
    id: String,
    refreshSidebar: Function
  },
  data() {
    return {
      title: null,
      content: null,
      tags: null,
      showDeleteForm: false,
      loading: false
    }
  },
  watch: {
    $route: {
      handler() {
        this.updateState()
      }
    }
  },
  mounted() {
    this.updateState()
  },
  methods: {
    async updateState() {
      this.loading = true
      const document = await getDocument(this.id)
      this.title = document.data.data.title
      window.document.title = `${this.title} - Wiki`
      this.content = document.data.data.content
      this.tags = document.data.data.tags
      this.showDeleteForm = false
      this.loading = false
    },
    async deleteDoc() {
      this.showDeleteForm = false
      this.loading = true
      const resp = await deleteDocument(this.id)
      console.log(resp)
      this.refreshSidebar()
      this.$router.push('/')
    },
    cancelDelete() {
      this.showDeleteForm = false
    },
    showDelete() {
      this.showDeleteForm = true
    },
    editDoc() {
      this.$router.push({ path: `/edit/${this.id}` })
    },
    getBackgroundColor(tag) {
      const opts = {}
      opts.hue = opts.hue || [0, 360]
      opts.sat = opts.sat || [55, 56]
      opts.lit = opts.lit || [35, 55]

      const range = function(hash, min, max) {
        const diff = max - min
        const x = ((hash % diff) + diff) % diff
        return x + min
      }
      let hash = 0
      if (tag.length === 0) return hash
      for (let i = 0; i < tag.length; i += 1) {
        // eslint-disable-next-line
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line
        hash = hash & hash;
      }

      const h = range(hash, opts.hue[0], opts.hue[1])
      const s = range(hash, opts.sat[0], opts.sat[1])
      const l = range(hash, opts.lit[0], opts.lit[1])

      return `background-color: hsl(${h}, ${s}%, ${l}%)`
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/content-view.scss';
</style>
