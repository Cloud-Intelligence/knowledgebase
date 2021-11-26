<template>
  <div class="edit-container" @click="closeDropdowns()">
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
    <div class="title-topic-form">
      <div class="topics">
        <input
            type="text"
            v-model="topic"
            placeholder="Topic"
            :class="(!topic==''||is_valid)?
                'topic-input trigger':
                'topic-input trigger invalid'"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            @click.stop="triggerDropdown('topic')"
            @keyup="debounce"
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
      <input
          :class="
                (!title == '' || is_valid)?
                'title-input':
                'title-input invalid'"
          type="text"
          placeholder="Untitled document"
          v-model="title"
          id="title"
          @keyup="debounce"
      />
    </div>
    <div class="submit">
      <button class="button" @click="finish">
        Return
      </button>
    </div>
    <div :class="(!content=='' || is_valid)?'quill-container':'quill-container invalid'">
      <quill-editor ref="myTextEditor"
                    v-model="content"
                    :options="quillOptions"
                    @keyup.native.capture.prevent="debounce"
      >
      </quill-editor>
    </div>
    <div class="tags" @click.stop="">
      <button
          :class="(tags.length || is_valid)? 'tag-input trigger':'tag-input trigger invalid'"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          @click="triggerDropdown('tags')"
      >
        <div v-if="tags.length">
          <button v-for="tag in tags"
                  :key="tag"
                  @click.stop="triggerDropdown('tags')"
                  :style="getBackgroundColor(tag)"
          >
            {{tag}}
            <span @click.stop="deleteTag(tag)" class="delete-container">
              <uil-times class="delete"></uil-times>
            </span>
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
                   placeholder="new tag"
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

import hljs from 'highlight.js';
import { quillEditor } from 'vue-quill-editor';
import Spinner from 'vue-simple-spinner';
import { UilPlus, UilTimes } from '@iconscout/vue-unicons';
import {
  getDocument,
  listTags,
  listTopics,
  updateDocument,
} from '../api/documents';

import getBackgroundColor from '../utils/dynamic_colours';

export default {
  name: 'Edit',
  props: {
    refreshSidebar: Function,
    pk: String,
  },
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
      timeout: null,
      loading: true,
      quillOptions: {
        theme: 'snow',
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video', 'formula'],
          ],
        },
      },
    };
  },
  components: {
    quillEditor,
    UilTimes,
    UilPlus,
    Spinner,
  },
  mounted() {
    // fetch all unique tags
    this.fetchUniqueTags();
    // fetch all topics
    this.fetchUniqueTopics();
    // fetch document data
    this.fetchDocument();
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
      const resp = await getDocument(this.pk);
      this.topic = resp.data.topic;
      this.title = resp.data.data.title;
      this.tags = resp.data.data.tags;
      this.content = resp.data.data.content;
      this.loading = false;
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
      this.debounce();
    },
    submitTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
        this.new_tag = '';
        this.debounce();
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter((value) => value !== tag);
      this.debounce();
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
    debounce() {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.updateDoc();
      }, 1000);
    },
    async updateDoc() {
      const {
        topic, title, tags, content,
      } = this;
      const data = {
        topic,
        data: {
          title,
          content,
          tags,
        },
      };
      try {
        await updateDocument(this.pk, JSON.stringify(data));
      } catch (error) {
        if (error.response.status) {
          this.appendError(`Error ${error.response.status}, failure to commit post.`);
        } else {
          this.appendError(error.message);
        }
      }
    },
    getBackgroundColor,
    finish() {
      this.$router.push(`/documents/${this.pk}/`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.snow.css';
@import '~quill/dist/quill.bubble.css';
@import "../assets/styles/document-edit";
</style>

<style lang="scss">
@import "../assets/styles/quill-overrides.scss";
</style>
