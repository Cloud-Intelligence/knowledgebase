<template>
  <div class="create_edit">
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
        <input
            :class="
                !title == '' || is_valid
                  ? 'title-input'
                  : 'title-input is-danger is-outlined'
              "
            type="text"
            placeholder="Untitled document"
            v-model="title"
            id="title"
        />
        <div class="topics dropdown" ref="dropdown">
          <input
              type="text"
              v-model="topic"
              placeholder="Topic"
              class="topic-input trigger"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              @click="triggerDropdown('topic')"
          >
          <div class="menu hide" role="menu" id="topic" ref="dropdown_menu">
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
    <quill-editor ref="myTextEditor" v-model="content" :class="
            !content == '' || is_valid
              ? ''
              : 'is-danger is-outlined'
          ">
    </quill-editor>
    <div class="tags dropdown" ref="dropdown">
      <input
          type="text"
          v-model="topic"
          placeholder="Tags"
          class="topic-input trigger"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          @click="triggerDropdown('tags')"
      >
      <div class="menu hide" role="menu" id="tags" ref="dropdown_menu">
        <div class="dropdown-content">
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
} from '@iconscout/vue-unicons';

import {
  getDocument,
  listTags,
  listTopics,
  postDocument,
  updateDocument,
} from '../api/documents';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.bubble.css';

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
      new_topic: '',
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
  },
  mounted() {
    // fetch all unique tags
    this.fetchUniqueTags();
    // fetch all topics
    this.fetchUniquetopics();

    // add event listener on document to close dropdowns
    document.addEventListener('click', this.documentClick);

    // Set the fields if an doc edit
    if (this.id) {
      this.fetchDocument();
    }
  },
  beforeDestroy() {
    // destroy event listener on document to close dropdowns
    document.removeEventListener('click', this.documentClick);
  },
  methods: {
    async fetchUniqueTags() {
      const resp = await listTags();
      this.loaded_tags = resp.data;
    },
    async fetchUniquetopics() {
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
    documentClick(event) {
      const el = this.$refs.dropdown;
      const menu = this.$refs.dropdown_menu;
      const { target } = event;
      if (el !== target && !el.contains(target)) {
        if (!menu.classList.contains('hide')) {
          menu.classList.toggle('hide');
        }
      }
    },
    submitTopic(topic) {
      this.topic = topic;
      console.log('vas');
    },
    submitTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
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
          this.$router.push(`/documents/${this.id}/`);
        } else {
          const resp = await postDocument(JSON.stringify(data));
          const { id } = resp;
          this.loading = false;
          this.$router.push(`/documents/${id}/`);
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

<style>

#create .editor {
  background: var(--content-colour);
}

#create .ql-toolbar {
  border: 1px solid var(--body-colour);
}

#create .ql-toolbar .ql-stroke {
  fill: none;
  stroke: var(--font-colour);
}

#create .ql-toolbar .ql-fill {
  fill: var(--font-colour);
  stroke: none;
}

#create .ql-toolbar .ql-picker {
  color: var(--font-colour);
}

#create .ql-toolbar .ql-picker-options {
  background: var(--content-colour);
}

#create .ql-container {
  height: 100%;
  max-height: 100%;
  border: 1px solid var(--body-colour);
  overflow-y: auto;
}

#create .ql-container .ql-editor > * {
  color: var(--font-colour);
}

#create .ql-container .ql-editor::before {
  color: var(--font-colour);
}

</style>

<style lang="scss">
@import "../assets/document-create-edit";
</style>
