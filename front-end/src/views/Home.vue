<template>
  <section class="main" id="main">
      <div class="container">
          <p>{{$auth.user}}</p>
          <button @click="requestMirage"></button>
      </div>
  </section>
</template>

<script>
export default {
    name: 'Home',
    methods: {
      requestMirage() {
        fetch('/api/todos')
        .then(resp => resp.json())
        .then(json => console.log(json));
      }
    },
}
</script>