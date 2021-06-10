<template>
    <div class="parent">
        <div v-for="(value,key) in mapLinks" :key="key">
            <div v-if="typeof value == 'string'">
                <button class="document-link" @click="clicked(value)"><font-awesome-icon icon="file" /> {{key}}</button>
            </div>
            <div v-else>
                <button class="accordion" @click="activate(key)"><font-awesome-icon icon="chevron-down" /> {{key}}</button>
                <div class="panel" :ref="key">
                    <accordion :map-links="value" @clicked="clicked"></accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Accordion",
    props: {
        mapLinks: {
            type: Object
        },
        // depth: {
        //   type: int,
        //   default: function() {
        //     return 0
        //   }
        // }
    },
    methods: {
        activate(key) {
            this.$refs[key].classList.toggle("active");
            // this.$refs[key].style.display = "block";
        },
        clicked(value){
            this.$emit('clicked',value);
        }
    }
}
</script>

<style scoped>

.parent {
    
}

.accordion {
  background-color: #0f4c75;
  padding: 5px 0px;
  font-weight: 500;
  font-size: 1.2em;
  text-transform: capitalize;
  color: lightgray;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

.document-link {
  background-color: #0f4c75;
  color: lightgray;
  outline: none;
  border: none;
  text-transform: capitalize;
  padding: 5px 0px;
  font-size: 1em;
}

.panel {
  padding: 0 18px;
  display: none;
  overflow: hidden;
}

.active {
  color: white;
  display: block;
}
</style>
