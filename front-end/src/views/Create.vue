<template>
  <section class="create" @click="closeDropdown">
    <transition name="fade">
      <div v-if="loading" class="loading is-overlay">
        <Spinner line-fg-color="#000000"></Spinner>
      </div>
    </transition>
    <div :class="error_is_hidden? 'error-message hide':'error-message'">
      <div
          v-if="this.error_message"
          class="notification is-danger is-light"
      >
        <button class="delete" @click="removeError(500)"></button>
        {{ this.error_message }}
      </div>
    </div>
    <div class="box">
      <h1 class="title">Create</h1>
      <hr>
      <div class="form">
        <div class="field">
          <p class="label">Document topic</p>
          <input :class="is_valid? 'input': 'input is-invalid'"
                 v-model="topic"
                 @click.stop="toggleDropdown"
                 @keyup.enter="createDoc"
          >
          <transition name="slide-fade">
            <div v-if="dropdownTopics" class="topic-container">
              <div class="topics" @click.stop>
                <button v-for="(topic, index) in loaded_topics"
                        :key="index" class="topic"
                        @click="submitTopic(topic)">
                  {{topic}}
                </button>
              </div>
            </div>
          </transition>
        </div>
        <div class="field">
          <p class="label">Document title</p>
          <input :class="is_valid? 'input': 'input is-invalid'"
                 v-model="title"
                 @keyup.enter="createDoc"
          >
        </div>
        <div class="submit">
          <button class="button" @click="createDoc">Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import Spinner from 'vue-simple-spinner';
import { listTopics, postDocument } from '../api/documents';

export default {
  props: {
    refreshSidebar: Function,
  },
  data() {
    return {
      topic: '',
      title: '',
      loaded_topics: [],
      is_valid: true,
      dropdownTopics: false,
      error_message: null,
      error_is_hidden: false,
      loading: false,
    };
  },
  components: {
    Spinner,
  },
  mounted() {
    this.fetchUniqueTopics();
  },
  methods: {
    closeDropdown() {
      this.dropdownTopics = false;
    },
    toggleDropdown() {
      this.dropdownTopics = !this.dropdownTopics;
    },
    async fetchUniqueTopics() {
      const resp = await listTopics();
      this.loaded_topics = resp.data;
    },
    submitTopic(topic) {
      this.topic = topic;
    },
    appendError(error) {
      this.error_message = error;
      setTimeout(() => {
        this.removeError(500);
      }, 5000);
    },
    removeError(timeout = 1000) {
      this.error_is_hidden = true;
      this.is_valid = true;
      setTimeout(() => {
        this.error_message = null;
        this.error_is_hidden = false;
      }, timeout);
    },
    async createDoc() {
      const { topic, title } = this;

      if (topic === '' || title === '') {
        this.is_valid = false;
        this.appendError('fields cannot be empty');
        return;
      }
      const data = {
        topic,
        data: {
          title,
          content: '',
          tags: [],
        },
      };

      try {
        this.loading = true;
        const resp = await postDocument(JSON.stringify(data));
        const { id } = resp;
        this.loading = false;
        this.refreshSidebar();
        this.loading = false;
        await this.$router.push(`/edit/${id}/`);
      } catch (error) {
        this.loading = false;
        if (error.response.status) {
          this.appendError(`Error ${error.response.status}, failure to commit post.`);
        } else {
          this.appendError(error.message);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/create";
</style>
