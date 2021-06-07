<template>
    <div class="parent">
        <div v-for="(value,key) in mapLinks" :key="key">
            <div v-if="typeof value == 'string'">
                <button @click="clicked(value)">{{key}}</button>
            </div>
            <div v-else>
                <button class="accordion" @click="activate(key)">{{key}}</button>
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
        }
    },
    methods: {
        activate(key) {
            this.$refs[key].classList.toggle("active");
            this.$refs[key].style.display = "block";
        },
        clicked(value){
            this.$emit('clicked',value);
        }
    }
}
</script>

<style scoped>

.parent {
    margin-left: 20px;
}

.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

.panel {
  padding: 0 18px;
  display: none;
  overflow: hidden;
}

</style>
