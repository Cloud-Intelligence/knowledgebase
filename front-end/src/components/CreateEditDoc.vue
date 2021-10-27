<template>
  <div class="create-edit-container" @click="closeDropdowns()">
    <div :class="error_is_hidden? 'error-message hide':'error-message'">
      <div
          v-if="this.error_message"
          class="notification is-danger is-light"
      >
        <button class="delete" @click="removeError(500)"></button>
        {{ this.error_message }}
      </div>
    </div>
    <div class="form">
      <div class="fields">
        <div class="topics dropdown" @click.stop="">
          <input
              type="text"
              v-model="topic"
              placeholder="Topic"
              :class="(!topic==''||is_valid)?
                'topic-input trigger':
                'topic-input trigger invalid'"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              @click.prevent="triggerDropdown('topic')"
          >
          <div class="menu hide" role="menu" id="topic" ref="topics_dropdown_menu">
            <div class="dropdown-content">
              <button
                  v-for="(topic, index) in loaded_topics"
                  class="dropdown-item"
                  :key="index"
                  @click="submitTopic(topic)"
              >
                {{ topic }}
              </button>
            </div>
          </div>
        </div>
        <h1 class="delimiter">/</h1>
        <input
            :class="
                (!title == '' || is_valid)?
                'title-input':
                'title-input invalid'"
            type="text"
            placeholder="Untitled document"
            v-model="title"
            id="title"
        />
      </div>
      <div class="submit">
        <button :class="loading?
              'save button is-info is-loading':
              'save button is-info'"
                @click="submitForm()">
          save
        </button>
      </div>
    </div>
    <div :class="(!content=='' || is_valid)?'quill-container':'quill-container invalid'">
      <quill-editor ref="myTextEditor" v-model="content">
      </quill-editor>
    </div>
    <div class="tags dropdown" @click.stop="">
      <button
          :class="(tags.length || is_valid)? 'tag-input trigger':'tag-input trigger invalid'"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          @click="triggerDropdown('tags')"
      >
        <div v-if="tags.length">
          <button v-for="tag in tags" :key="tag" @click.stop="deleteTag(tag)">
            {{tag}} <span><uil-times></uil-times></span>
          </button>
        </div>
        <div v-else>
          <p>#tags</p>
        </div>
      </button>
      <div class="menu hide" role="menu" id="tags" ref="tags_dropdown_menu">
        <div class="dropdown-content">
          <div class="dropdown-item input-box">
            <input class="text" type="text"
                   placeholder="#new tag"
                   v-model="new_tag"
                   @keydown.enter="submitTag(new_tag)"
            >
            <span>
              <button class="button" @click="submitTag(new_tag)"><uil-plus></uil-plus></button>
            </span>
          </div>
          <button
              v-for="(tag, index) in loaded_tags"
              class="dropdown-item"
              :key="index"
              @click="submitTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { quillEditor } from 'vue-quill-editor';

import {
  UilTimes,
  UilPlus,
} from '@iconscout/vue-unicons';

import {
  getDocument,
  listTags,
  listTopics,
  postDocument,
  updateDocument,
} from '../api/documents';

export default {
  name: 'CreateEditDoc',
  data() {
    return {
      topic: '',
      content: '',
      title: '',
      tags: [],
      loaded_topics: [],
      loaded_tags: [],
      new_tag: '',
      is_valid: true,
      error_message: null,
      error_is_hidden: false,
      loading: false,
    };
  },
  props: {
    refreshSidebar: Function,
    id: String,
  },
  components: {
    quillEditor,
    UilTimes,
    UilPlus,
  },
  mounted() {
    // fetch all unique tags
    this.fetchUniqueTags();
    // fetch all topics
    this.fetchUniqueTopics();

    // Set the fields if an doc edit
    if (this.id) {
      this.fetchDocument();
    }
  },
  methods: {
    async fetchUniqueTags() {
      const resp = await listTags();
      this.loaded_tags = resp.data;
    },
    async fetchUniqueTopics() {
      const resp = await listTopics();
      this.loaded_topics = resp.data;
    },
    async fetchDocument() {
      const resp = await getDocument(this.id);
      this.topic = resp.data.topic;
      this.title = resp.data.data.title;
      this.tags = resp.data.data.tags;
      this.content = resp.data.data.content;
    },
    triggerDropdown(dropdown) {
      const menu = document.getElementById(dropdown);
      menu.classList.toggle('hide');
    },
    closeDropdowns() {
      const topicMenu = this.$refs.topics_dropdown_menu;
      const tagMenu = this.$refs.tags_dropdown_menu;
      if (!topicMenu.classList.contains('hide')) {
        topicMenu.classList.toggle('hide');
      }
      if (!tagMenu.classList.contains('hide')) {
        tagMenu.classList.toggle('hide');
      }
    },
    submitTopic(topic) {
      this.topic = topic;
    },
    submitTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
        this.new_tag = '';
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter((value) => value !== tag);
    },
    appendError(error) {
      this.error_message = error;
      setTimeout(() => {
        this.removeError(500);
      }, 5000);
    },
    removeError(timeout = 1000) {
      this.error_is_hidden = true;
      setTimeout(() => {
        this.error_message = null;
        this.error_is_hidden = false;
      }, timeout);
    },
    async submitForm() {
      this.loading = true;
      const {
        topic, title, tags, content,
      } = this;

      if (topic === '' || title === '' || tags.length === 0 || content === '') {
        this.is_valid = false;
        this.loading = false;
        this.appendError('fields cannot be empty');
        return;
      }
      this.is_valid = true;
      const data = {
        topic,
        data: {
          title,
          content,
          tags,
        },
      };
      try {
        if (this.id) {
          await updateDocument(this.id, JSON.stringify(data));
          await this.$router.push(`/documents/${this.id}/`);
        } else {
          const resp = await postDocument(JSON.stringify(data));
          const { id } = resp;
          this.loading = false;
          await this.$router.push(`/documents/${id}/`);
        }
        this.refreshSidebar();
      } catch (error) {
        if (error.response.status) {
          this.appendError(`Error ${error.response.status}, failure to commit post.`);
        } else {
          this.appendError(error.message);
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.snow.css';
@import '~quill/dist/quill.bubble.css';
@import "../assets/styles/document-create-edit";
</style>

<style lang="scss">
@import "../assets/styles/quill-overrides.scss";
</style>
