<template>
  <div class="content-main">
  <div v-html="ctx.html"></div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue'
export default {
  name: "Content",
  props: {
    url: {
      type: String
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
      ctx.html = `<p>${ctx.text}</p>`// todo: parse md here
    })

    return { ctx }
  }
}
</script>