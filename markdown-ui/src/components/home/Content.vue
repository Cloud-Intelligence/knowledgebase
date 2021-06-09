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

<style scoped src="@/styles/main.css"/>
<style scoped src="@/styles/hljs.css"/>
<style scoped src="@/styles/pilcrow.css"/>
<style scoped>
@import url(//fonts.googleapis.com/css?family=PT+Sans);
@import url(//fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700);
.content-main {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;

  font-family: 'PT Sans', sans-serif;
  color: #839496;
  margin: 1em;
}
</style>

