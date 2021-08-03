<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="heading">
          <div class="container head">
            <h1 class="title">{{ title }}</h1>
          </div>
          <div class="container icons">
            <uil-trash-alt class="trash"></uil-trash-alt>
            <uil-edit class="edit"></uil-edit>
            <uil-star class="star"></uil-star>
          </div>
        </div>
        <div class="content">
          <div class="text">
            {{ content }}
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

export default {
  name: 'Document',
  components: {
    UilTrashAlt,
    UilEdit,
    UilStar,
  },
  data() {
    return {
      topic: null,
      title: null,
      content: null,
      tags: null,
    };
  },
  props: {
    id: String,
  },
  methods: {
    updateState() {
      fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents/${this.id}`)
        .then((res) => res.json())
        .then((json) => {
          this.title = json.data.title;
          this.content = json.data.content;
          this.tags = json.data.tags;
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
  created() {
    this.updateState();
  },
};
</script>

<style lang="sass">
  @import '../assets/content-view.scss'
</style>
