<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="fields">
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>{{ topic }}</span>
                <span class="icon is-small">
                  <uil-angle-down></uil-angle-down>
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
                <div class="dropdown-item add_topic columns">
                  <input
                    class="input column is-three-quarters"
                    type="text"
                    placeholder="#Topic"
                  />
                  <button class="button column add_button">+</button>
                </div>
              </div>
            </div>
          </div>

          <input class="input" type="text" placeholder="#Title" />

          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span v-for="(tag, index) in tags" class="tag" :key="index">{{
                  tag
                }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a
                  v-for="(tag, index) in loaded_tags"
                  class="dropdown-item"
                  :key="index"
                >
                  {{ tag }}
                </a>
                <hr class="dropdown-divider" />
                <div class="dropdown-item add_topic columns">
                  <input
                    class="input column is-three-quarters"
                    type="text"
                    placeholder="#Tag"
                  />
                  <button class="button column add_button">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { UilAngleDown } from '@iconscout/vue-unicons';

export default {
  data() {
    return {
      topic: '#Topic',
      content: '<p>Dummy content</p>',
      title: '#Title',
      tags: [],
      loaded_topics: [],
      loaded_tags: [],
    };
  },
  components: {
    UilAngleDown,
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
  },
};
</script>
