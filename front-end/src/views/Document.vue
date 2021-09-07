<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="heading">
          <div class="container head">
            <h1 class="title">{{ title }}</h1>
          </div>
          <div class="container icons">
            <div class="trash" @click="deleteDoc">
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
import { getDocument } from '../api/documents';

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
    };
  },
  props: {
    id: String,
  },
  methods: {
    async updateState() {
      const document = await getDocument(this.id);
      this.title = document.data.data.title;
      this.content = document.data.data.content;
      this.tags = document.data.data.tags;
    },
    deleteDoc() {
      console.log('clicked');
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
