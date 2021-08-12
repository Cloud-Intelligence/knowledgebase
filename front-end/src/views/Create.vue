<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="form columns">
          <div class="fields column">
            <div class="dropdown" id="topics">
              <div
                class="dropdown-trigger"
              >
                <button
                  :class="
                  !topic == '' || is_valid
                    ? 'button'
                    : 'button is-danger is-outlined'
                "
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="tiggerDropdown('topics')"
                >
                  <div class="child-container">
                    <p v-if="topic">{{ topic }}</p>
                    <p v-else>#topic</p>
                  </div>
                  <span class="icon is-small">
                    <uil-angle-down class="icon-arrow"></uil-angle-down>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    v-for="(topic, index) in loaded_topics"
                    class="dropdown-item"
                    :key="index"
                    @click="submitTopic(topic)"
                  >
                    {{ topic }}
                  </a>
                  <hr class="dropdown-divider" />
                  <div class="dropdown-item add_element columns">
                    <input
                      class="input column is-three-quarters"
                      type="text"
                      placeholder="#New topic"
                      v-model="new_topic"
                      @keydown.enter="submitTopic(new_topic)"
                    />
                    <button
                      class="button column add_button is-one-quarter"
                      @click="submitTopic(new_topic)"
                    >
                      <uil-check></uil-check>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p
              :class="
                !topic == '' || is_valid
                  ? 'help is-danger is-hidden'
                  : 'help is-danger'
              "
            >
              this filed is required
            </p>

            <input
              :class="
                !title == '' || is_valid
                  ? 'input title_input'
                  : 'input title_input is-danger is-outlined'
              "
              type="text"
              placeholder="#Title"
              v-model="title"
              id="title"
            />
            <p
              :class="
                !title == '' || is_valid
                  ? 'help is-danger is-hidden'
                  : 'help is-danger'
              "
            >
              This field is required
            </p>

            <div class="dropdown" id="tags">
              <div
                class="dropdown-trigger"
              >
                <button
                  :class="
                  !tags.length == 0 || is_valid
                    ? 'button'
                    : 'button is-danger is-outlined'
                "
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="tiggerDropdown('tags')"
                >
                  <div class="child-container" v-if="tags.length">
                    <div
                      v-for="(tag, index) in tags"
                      class="tag"
                      :key="index"
                      v-on:click.stop="deleteTag(tag)"
                    >
                      <p>{{ tag }}</p>
                      <p class="icon-close"><uil-times></uil-times></p>
                    </div>
                  </div>
                  <div class="child-container" v-else>
                    <p>#tags</p>
                  </div>
                  <span class="icon is-small">
                    <uil-angle-down class="icon-arrow"></uil-angle-down>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    v-for="(tag, index) in loaded_tags"
                    class="dropdown-item"
                    :key="index"
                    @click="submitTag(tag)"
                  >
                    {{ tag }}
                  </a>
                  <hr class="dropdown-divider" />
                  <div class="dropdown-item add_element columns">
                    <input
                      class="input column is-three-quarters"
                      type="text"
                      placeholder="#New tag"
                      v-model="new_tag"
                      @keydown.enter="submitTag(new_tag)"
                    />
                    <button
                      class="button column add_button is-one-quarter"
                      @click="submitTag(new_tag)"
                    >
                      <uil-plus></uil-plus>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p
              :class="
                !tags.length == 0 || is_valid
                  ? 'help is-danger is-hidden'
                  : 'help is-danger'
              "
            >
              This filed is required
            </p>
          </div>
          <div class="submit column">
            <button :class="loading?
              'save button is-info is-loading':
              'save button is-info'"
              @click="submitForm()">
              save
            </button>
          </div>
        </div>
        <div
          :class="!content == '' || is_valid? 'editor box':' editor box invalid'"
          id="editor"
        >
          <quill-editor ref="myTextEditor" v-model="content" :class="
            !content == '' || is_valid
              ? ''
              : 'is-danger is-outlined'
          "></quill-editor>
        </div>
        <p
          :class="
            !content == '' || is_valid
              ? 'help is-danger is-hidden'
              : 'help is-danger'
          "
        >
          This field is required
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import {
  UilAngleDown,
  UilCheck,
  UilTimes,
  UilPlus,
} from '@iconscout/vue-unicons';

import { quillEditor } from 'vue-quill-editor';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.bubble.css';

export default {
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
      loading: false,
    };
  },
  props: {
    refreshSidebar: Function,
  },
  components: {
    quillEditor,
    UilAngleDown,
    UilCheck,
    UilTimes,
    UilPlus,
  },
  created() {
    // fetch all uniue tags
    fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents/tags`)
      .then((res) => res.json())
      .then((json) => {
        this.loaded_tags = json.data.tags;
      });
    // fetch all topics
    fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents/topics`)
      .then((res) => res.json())
      .then((json) => {
        this.loaded_topics = json.data.topics;
      });
  },
  methods: {
    tiggerDropdown(id) {
      document.getElementById(id).classList.toggle('is-active');
    },
    submitTopic(topic) {
      this.topic = topic;
      document.getElementById('topics').classList.toggle('is-active');
    },
    submitTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter((value) => value !== tag);
    },
    submitForm() {
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
      fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        this.loading = false;
      });
      this.refreshSidebar();
    },
  },
};
</script>

<style>
#main .editor .quill-editor .ql-container {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>

<style lang="scss">
@import "../assets/Create-view.scss";
</style>
