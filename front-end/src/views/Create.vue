<template>
  <section class="main" id="main">
    <div class="container">
      <div class="layout">
        <div class="fields">
          <div class="dropdown is-active">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>{{topic}}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
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
                <div class="add_topic columns">
                  <input class="input column is-three-quarters" type="text" placeholder="#Topic" />
                  <button class="button column add_button">+</button>
                </div>
              </div>
            </div>
          </div>

          <input class="input" type="text" placeholder="#Title" />

          <div class="dropdown is-active">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span v-for="(tag, index) in tags" class="tag " :key="index">{{tag}}</span>
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
                <div class="add_topic columns">
                  <input class="input column is-three-quarters" type="text" placeholder="#Tag" />
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
export default {
  data() {
    return {
      topic: '',
      content: '',
      title: '',
      tags: [],
      loaded_topics: [],
      loaded_tags: [],
    };
  },
  created() {
    fetch(`${process.env.VUE_APP_BASE_API_URL}/api/documents`)
      .then((res) => res.json())
      .then((json) => {
        const files = json.data;
        const tmpTopics = [];
        const tmpTags = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < files.length; i++) {
          const fileTopic = files[i].topic;
          const fileTags = files[i].tags;
          if (!(fileTopic in tmpTopics)) {
            tmpTopics.push(fileTopic);
          }
          // eslint-disable-next-line no-plusplus
          for (let j = 0; j < fileTags.length; j++) {
            const tag = fileTags[j];
            if (!(tag in tmpTags)) {
              tmpTags.push(tag);
            }
          }
        }
        this.topics = tmpTopics;
        this.tags = tmpTags;
        console.log(this.topics);
      });
  },
};
</script>
