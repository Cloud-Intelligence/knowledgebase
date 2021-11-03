<template>
  <section class="document" id="document">
    <transition name="fade">
      <div v-if="loading" class="loading is-overlay">
        <Spinner line-fg-color="#000000"></Spinner>
      </div>
    </transition>
    <transition name="fade">
      <div class="delete-container is-overlay" v-if="showDeleteForm">
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
      <p>{{topic}}</p>
    </div>
    <div class="title-bar">
      <div class="head">
        <h1 class="title">{{ title }}</h1>
      </div>
      <div class="container icons">
        <div class="trash" @click="showDelete">
          <uil-trash-alt></uil-trash-alt>
        </div>
        <div class="edit" @click="editDoc">
          <uil-edit class="edit"></uil-edit>
        </div>
        <div class="star">
          <uil-star class="star"></uil-star>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="text" v-html="content" ref="content">
      </div>
      <div class="tags">
        <p v-for="tag in tags"
           class="tag"
           :key="tag"
           :style="getBackgroundColor(tag)">
          {{ tag }}
        </p>
      </div>
    </div>

  </section>
</template>

<script>
// highlight.js
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import { UilTrashAlt, UilEdit, UilStar } from '@iconscout/vue-unicons';
import Spinner from 'vue-simple-spinner';
import { deleteDocument, getDocument } from '../api/documents';

import getBackgroundColor from '../utils/dynamic_colours';

export default {
  name: 'Document',
  components: {
    UilTrashAlt,
    UilEdit,
    UilStar,
    Spinner,
  },
  data() {
    return {
      topic: null,
      title: null,
      content: null,
      tags: null,
      showDeleteForm: false,
      loading: false,
    };
  },
  props: {
    id: String,
    refreshSidebar: Function,
  },
  methods: {
    async updateState() {
      this.loading = true;
      const document = await getDocument(this.id);
      this.topic = document.data.topic;
      this.title = document.data.data.title;
      window.document.title = `${this.title} - Wiki`;
      this.content = document.data.data.content;
      this.tags = document.data.data.tags;
      this.showDeleteForm = false;
      this.$nextTick(() => this.highlightCode());
      this.loading = false;
    },
    async deleteDoc() {
      this.showDeleteForm = false;
      this.loading = true;
      const resp = await deleteDocument(this.id);
      console.log(resp);
      this.refreshSidebar();
      this.$router.push('/');
    },
    cancelDelete() {
      this.showDeleteForm = false;
    },
    showDelete() {
      this.showDeleteForm = true;
    },
    editDoc() {
      this.$router.push({ path: `/edit/${this.id}` });
    },
    getBackgroundColor,
    highlightCode() {
      const codeBlocks = this.$refs.content.querySelectorAll('pre');
      console.log(codeBlocks);
      codeBlocks.forEach((el) => {
        // eslint-disable-next-line
        el.innerHTML = hljs.highlightAuto(el.innerText).value;
      });
    },
  },
  watch: {
    $route: {
      handler() {
        this.updateState();
      },
    },
  },
  mounted() {
    this.updateState();
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/content-view.scss';
</style>
