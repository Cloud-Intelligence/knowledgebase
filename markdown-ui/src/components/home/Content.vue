<template>
    <div class="content-main">
        
    </div>    
</template>

<script>
export default {
    name: "Content",
    props: {
        url: {
            type: String
        }
    },
    watch : {
        url : {
            handler: function(){
                this.updateContent()
            }
        }
    },
    methods: {
        updateContent: () => {
            console.log(this.url);
        }
    }
}
</script>