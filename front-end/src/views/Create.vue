<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
        <div class="editor">
          <quill-editor ref="myTextEditor" v-model="content"></quill-editor>
        </div>
>>>>>>> 2a3561c (added quill)
        <div class="fields">
          <div class="dropdown" id="topics">
            <div class="dropdown-trigger">
              <button
                class="button"
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
                >
                  {{ topic }}
                </a>
                <hr class="dropdown-divider" />
                <div class="dropdown-item add_element columns">
                  <input
                    class="input column is-three-quarters"
                    type="text"
                    placeholder="#Topic"
                    v-model="new_topic"
                  />
                  <button
                    class="button column add_button"
                    @click="submitTopic(new_topic)"
                  >
                    <uil-check></uil-check>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <input
            class="input"
            type="text"
            placeholder="#Title"
            v-model="title"
          />

          <div class="dropdown" id="tags">
            <div class="dropdown-trigger">
              <button
                class="button"
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
                    placeholder="#Tag"
                    v-model="new_tag"
                  />
                  <button
                    class="button column add_button"
                    @click="submitTag(new_tag)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
>>>>>>> c63005a (added new create page and removed redundant data in documents view)
      </div>
    </div>
  </section>
</template>

<script>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

<<<<<<< HEAD
import { listTags, listTopics, postDocument } from '../api/documents';

=======
=======
>>>>>>> c63005a (added new create page and removed redundant data in documents view)
<<<<<<< HEAD
>>>>>>> 6f1512a (added new create page and removed redundant data in documents view)
=======
=======

import { UilAngleDown } from '@iconscout/vue-unicons';
=======
import { UilAngleDown, UilCheck, UilTimes } from '@iconscout/vue-unicons';
>>>>>>> c183cb5 (added form fields to add document details)

>>>>>>> dadbbfd (added dropdowns)
>>>>>>> c4bd1db (added dropdowns)
export default {
  data() {
    return {
      topic: '',
      content: '<p>Dummy content</p>',
      title: '',
      tags: [],
      loaded_topics: [],
      loaded_tags: [],
<<<<<<< HEAD
<<<<<<< HEAD
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
    // fetch all unique tags
    this.fetchUniqueTags();
    // fetch all topics
    this.fetchUniquetopics();
  },
  methods: {
    async fetchUniqueTags() {
      const resp = await listTags();
      this.loaded_tags = resp.data.tags;
    },
    async fetchUniquetopics() {
      const resp = await listTopics();
      this.loaded_topics = resp.data.topics;
    },
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
      await postDocument(JSON.stringify(data));
      this.loading = false;
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
@import "../assets/create-view.scss";
</style>
=======
=======
      new_topic: '',
      new_tag: '',
>>>>>>> c183cb5 (added form fields to add document details)
    };
  },
  components: {
    UilAngleDown,
    UilCheck,
    UilTimes,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents`)
        .then((res) => res.json())
        .then((json) => {
          const files = json.data;
          const tmp = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < files.length; i++) {
            const fileTopic = files[i].topic;
            if (!tmp.includes(fileTopic)) {
              tmp.push(fileTopic);
            }
          }
          this.loaded_topics = tmp;
        });
    },
    tiggerDropdown(id) {
      document.getElementById(id).classList.toggle('is-active');
    },
    submitTopic(topic) {
      this.topic = topic;
      document.getElementById('topics').classList.toggle('is-active');
    },
    submitTag(tag) {
      if (this.tags.includes(tag) || this.loaded_tags.includes(tag)) {
        // do somthing validation wise
      } else {
        this.tags.push(tag);
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter((value) => value !== tag);
    },
  },
};
</script>
<<<<<<< HEAD
>>>>>>> c63005a (added new create page and removed redundant data in documents view)
=======

<style scoped>
#main .fields > * {
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
}

#main .fields .dropdown {
  width: 100%;
  display: flex;
}

#main .fields .dropdown .dropdown-trigger {
  width: 100%;
}

#main .fields .dropdown .dropdown-trigger .button {
  width: 100%;
  height: max-content;
  justify-content: initial;
}

#main .fields .dropdown .dropdown-trigger .button .child-container {
  width: 90%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

#main .fields .dropdown .dropdown-trigger .button .child-container .tag {
  transition: background-color 0.25s;
  margin: 5px 5px 5px 0;
  height: 2rem;
}

#main .fields .dropdown .dropdown-trigger .button .child-container .tag:hover {
  background-color: grey;
}

#main .fields .dropdown .dropdown-trigger .button .child-container .tag .icon-close {
  margin-left: 5px;
}

#main .fields .dropdown .dropdown-trigger .button .icon {
  width: 10%;
  margin-left: auto;
  justify-content: flex-end;
}

#main .fields .dropdown .dropdown-menu .dropdown-content .dropdown-item .input {
  border-radius: 10px 0 0 10px;
}

#main
  .fields
  .dropdown
  .dropdown-menu
  .dropdown-content
  .dropdown-item.add_element {
    margin: 1px 0 1px 0;
  }

#main
  .fields
  .dropdown
  .dropdown-menu
  .dropdown-content
  .dropdown-item.add_element
  .button {
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center;
}

.dropdown .dropdown-trigger .button .icon-arrow {
  transition: transform 0.25s;
}

.dropdown.is-active .dropdown-trigger .button .icon-arrow {
  transform: rotate(180deg);
}
</style>
>>>>>>> c183cb5 (added form fields to add document details)
