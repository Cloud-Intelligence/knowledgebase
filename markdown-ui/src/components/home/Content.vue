<template>
  <div class="content-main">
      <VueShowdown :markdown="ctx.text" flavor="github" :options="{ emoji: true }" />
  </div>
</template>

<script>
import { watch, reactive } from 'vue'
import {VueShowdown} from 'vue-showdown';
export default {
  name: "Content",
  components: {
    VueShowdown,
  },
  props: {
    url: {
      type: String,
    }
  },
  setup(props) {
    const ctx = reactive({
      url: props.url
    })

    watch(() => props.url, async (url) => {
      ctx.url = url
      let rsp = await fetch(`http://localhost:9001${url}`)
      ctx.text = await rsp.text()
    })

    return { ctx }
  }
}
</script>

<style src="@/styles/main.css"/>
<style src="@/styles/hljs.css"/>
<style scoped>
.content-main {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  color: #839496;
  margin: 1em;
}
</style>

