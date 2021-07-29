<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="heading">
          <div class="container head">
            <h1 class="title">{{ title }}</h1>
            <p class="tag">#{{ topic }}</p>
          </div>
          <div class="container icons">
            <uil-trash-alt class="trash"></uil-trash-alt>
            <uil-edit class="edit"></uil-edit>
            <uil-star class="star"></uil-star>
          </div>
        </div>
        <div class="content">
          <div class="text">
            <VueShowdown :markdown="content" flavor="github" />
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
  name: 'Home',
  components: {
    UilTrashAlt,
    UilEdit,
    UilStar,
  },
  created() {},
  computed: {
    title() {
      return this.$store.state.contentView.title;
    },
    topic() {
      return this.$store.state.contentView.topic;
    },
    content() {
      return this.$store.state.contentView.content;
    },
    tags() {
      return this.$store.state.contentView.tags;
    },
  },
};
</script>

<style lang="sass">
  @import '../assets/content-view.scss'
</style>
