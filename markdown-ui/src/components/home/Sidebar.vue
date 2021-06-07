<template>
    <div class="sidebar-nav">
        <div class="sidebar-content">
            <div class="nav-head">
                <h2>Documents</h2>
            </div>
            <div class="nav-body" id="nav-body">
                {{content}}
            </div>
        </div>
    </div>
</template>


<script>

export default {
    name: 'Sidebar',
    props: {
        updateContent: {
            type: Function,
            required: true,
        }
    },
    data () {
        return{
            content: null
        };
    },
    created () {
        fetch("http://localhost:9001/")
        .then(response => response.json())
        .then(data => {
                //all the fun logic goes here because of fucking promises
                //logic for mapping the files to a heirarchical object
                let mapped_links = {};
                for(let val in data){
                    let link = data[val].substring(4).split('/');
                    let mapped_links_ref_array = [mapped_links];
                    for(const index in link){
                        let dir = link[index];
                        let regex = /\.md/;
                        let array_last_index = mapped_links_ref_array.length-1;
                        if(regex.test(dir)){
                            mapped_links_ref_array[array_last_index][dir];
                            mapped_links_ref_array[array_last_index][dir] = data[val];
                        }else{
                            if(Object.prototype.hasOwnProperty.call(mapped_links_ref_array[array_last_index], dir)){
                                let temp_ref_array = mapped_links_ref_array[array_last_index];
                                mapped_links_ref_array.push(temp_ref_array[dir]);
                            }else{
                                let temp_ref_array = mapped_links_ref_array[array_last_index];
                                temp_ref_array[dir];
                                temp_ref_array[dir] = {};
                                mapped_links_ref_array.push(temp_ref_array[dir]);
                            }
                        }
                    }
                }
                //logic for mapping those files into html elements
                let map_elements = (file_object_struct) => {
                    let ret_mapped_elems = "";
                    Object.keys(file_object_struct).forEach(key => {
                        let key_name = key;
                        let key_val = file_object_struct[key];
                        if(typeof key_val == "string"){
                            ret_mapped_elems += `<div class="link-button" @click='updateContent("${key_val}")'>
                                                    <div class="colour-tab" style="background-color: whitesmoke; width: 2.5%; height: 100%;"></div>
                                                    <p style="padding-left: 10px;">${key_name}</p>
                                                </div>`;
                        }else{
                            ret_mapped_elems += `<div class="dropdown collapsed" id="${key_name}" @click='updateDivStyle("${key_name}")'>
                                                    <div  class="drop-button">
                                                        <p>${key_name}</p>
                                                        <i class="arrow arrow-up">&#xf106;</i>
                                                    </div>`;
                            ret_mapped_elems += map_elements(key_val);
                            ret_mapped_elems += `</div>`;
                        }
                    });
                    return ret_mapped_elems;
                }
                document.getElementById("nav-body").innerHTML = map_elements(mapped_links);
            }
        );
    },
    methods: {
        updateDivStyle: (id) => {
            console.log(id);
        }
    }
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