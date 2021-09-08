<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
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
        <div class="heading">
          <div class="container head">
            <h1 class="title">{{ title }}</h1>
          </div>
          <div class="container icons">
            <div class="trash" @click="showDelete">
              <uil-trash-alt></uil-trash-alt>
            </div>
            <div class="edit">
              <uil-edit class="edit"></uil-edit>
            </div>
            <div class="star">
              <uil-star class="star"></uil-star>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="text" v-html="content">
          </div>
        </div>
        <div class="foot">
          <div class="container tags">
            <p v-for="tag in tags" class="tag" :key="tag">{{ tag }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { UilTrashAlt, UilEdit, UilStar } from '@iconscout/vue-unicons';
import { deleteDocument, getDocument } from '../api/documents';

export default {
  name: 'Document',
  components: {
    UilTrashAlt,
    UilEdit,
    UilStar,
  },
  data() {
    return {
      title: null,
      content: null,
      tags: null,
      showDeleteForm: false,
    };
  },
  props: {
    id: String,
    refreshSidebar: Function,
  },
  methods: {
    async updateState() {
      const document = await getDocument(this.id);
      this.title = document.data.data.title;
      this.content = document.data.data.content;
      this.tags = document.data.data.tags;
      this.showDeleteForm = false;
    },
    async deleteDoc() {
      const resp = await deleteDocument(this.id);
      console.log(resp);
      this.refreshSidebar();
      this.$router.push('/');
      this.showDeleteForm = false;
    },
    cancelDelete() {
      this.showDeleteForm = false;
    },
    showDelete() {
      this.showDeleteForm = true;
    },
  },
  watch: {
    $route: {
      handler() {
        this.updateState();
      },
    },
  },
  created() {
    this.updateState();
  },
};
</script>

<style lang="sass">
  @import '../assets/content-view.scss'
</style>
