<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="form columns">
          <div class="fields column">
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
          <div class="submit column">
            <button class="save button is-info">save</button>
          </div>
        </div>
        <div class="editor">
          <quill-editor ref="myTextEditor" v-model="content"></quill-editor>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { UilAngleDown, UilCheck, UilTimes } from '@iconscout/vue-unicons';

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

<style>

#main .editor .quill-editor .ql-container  {
  height: 100%;
  overflow-y: auto;
}

</style>

<style scoped>

#main .fields > * {
  width: 100%;
  margin-bottom: 1rem;
}

#main .editor {
  height: 100%;
}

#main .editor .quill-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#main .form .submit .save {
  width: 100%;
}

#main .form {
  display: flex;
}

#main .form .fields .dropdown {
  width: 100%;
  display: flex;
}

#main .form .fields .dropdown .dropdown-trigger {
  width: 100%;
}

#main .form .fields .dropdown .dropdown-trigger .button {
  width: 100%;
  height: max-content;
  justify-content: initial;
}

#main .form .fields .dropdown .dropdown-trigger .button .child-container {
  width: 90%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

#main .form .fields .dropdown .dropdown-trigger .button .child-container .tag {
  transition: background-color 0.25s;
  margin: 5px 5px 5px 0;
  height: 2rem;
}

#main .form .fields .dropdown .dropdown-trigger .button .child-container .tag:hover {
  background-color: grey;
}

#main
  .form
  .fields
  .dropdown
  .dropdown-trigger
  .button
  .child-container
  .tag
  .icon-close {
  margin-left: 5px;
}

#main .form .fields .dropdown .dropdown-trigger .button .icon {
  width: 10%;
  margin-left: auto;
  justify-content: flex-end;
}

#main .form .fields .dropdown .dropdown-menu .dropdown-content .dropdown-item .input {
  border-radius: 10px 0 0 10px;
}

#main
  .form
  .fields
  .dropdown
  .dropdown-menu
  .dropdown-content
  .dropdown-item.add_element {
  margin: 1px 0 1px 0;
  display: flex;
}

#main
  .form
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
