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
    
    .sidebar-nav {
        width: auto;
        min-width: 20%;
        height: 100vh;
        text-align: start;
        overflow-y: hidden;
        display: grid;
        background-color: hsl(240, 100%, 70%);
        color: whitesmoke;
    }

    .sidebar-content {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }

    .nav-head {
        margin-bottom: 1rem;
    }

    .link-button {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        vertical-align: middle;
        cursor: pointer;
        height: 1rem;
        line-height: 1rem;
    }

    .dropdown{
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;        
    }

    .collapsed {
        height: auto;
        transition: height 1s linear;
    }

    .open {
        height: auto;
        transition: height 1s linear;
    }

    .drop-button{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 1rem;
        line-height: 1rem;
    }

    .arrow-up{
        transform: rotateX(0deg);
        transition: transform 1s linear;
    }

    .arrow-down {
        transform: rotateX(180deg);
        transition: transform 1s linear;
    }

</style>