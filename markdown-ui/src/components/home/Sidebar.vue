<template>
    <div class="sidebar-nav">
        <div class="sidebar-content">
            <div class="nav-head">
                <h2>Documents</h2>
            </div>
            <div class="nav-body" id="nav-body">
                <accordion v-if="map_links" :map-links="map_links" @clicked="clicked"></accordion>
            </div>
        </div>
    </div>
</template>


<script>
import Accordion from "./Accordion.vue"

export default {
    name: 'Sidebar',
    components: {
        Accordion
    },
    data () {
        return{
            map_links: null
        };
    },
    methods: {
        clicked(url){
            this.$emit('clicked', url);
        }
    },
    async mounted() {
      // no callback hell when you use await
      let resp = await fetch("http://localhost:9001/")
      resp = await resp.json()

      this.map_links = resp
    },
}

</script>

<style>

</style>