<template>
    <label class="form-label">Modification des caractéristiques</label>

    <ul class="nav nav-pills">
        <li class="nav-item">
            <a id="m-simple" @click="event => updateNav(event)" :class="`nav-link ${nav=='m-simple' ? 'active' : ''}`" href="#">Mode simplifié</a>
        </li>
        <li class="nav-item">
            <a id="m-free" @click="event => updateNav(event)" class="nav-link" :class="`nav-link ${nav=='m-free' ? 'active' : ''}`" href="#">Mode libre</a>
        </li>
        <!-- <li class="nav-item">
            <a id="m-classic" @click="event => updateNav(event)" class="nav-link" :class="`nav-link ${nav=='m-classic' ? 'active' : ''}`" href="#">Mode classique</a>
        </li> -->
    </ul>
    
    <SimplifiedForm 
    v-if="nav=='m-simple'" 
    :abilitiesValues="[15, 14, 13, 12, 10, 8]"
    @storeForm3="(results, map) => storeForm3(results, map)"
    />
    <FreeForm 
    v-if="nav=='m-free'"
    @storeForm3="(results, map) => storeForm3(results, map)"
    />
    <!-- <ClassicForm 
    v-if="nav=='m-classic'"
    @storeForm3="(results, map) => storeForm3(results, map)"
    /> -->

    <FormController @next="emit('next')" @previous="emit('previous')" />

</template>


<script setup>
import { useStore } from 'vuex';
/* eslint-disable no-unused-vars */
import { defineEmits, computed, ref } from 'vue';
import SimplifiedForm from './form3/SimplifiedForm.vue';
import FreeForm from './form3/FreeForm.vue';
//import ClassicForm from './form3/ClassicForm.vue';
import {Form3} from '@/api/typeNew'
import FormController from './FormController.vue';


const emit = defineEmits(['next', 'previous'])

const nav = ref('m-simple')

const updateNav = (event) => {
    //store.commit('form3/setForm3Mode', event.target.id);
    nav.value = event.target.id;   
}   

/* eslint-disable no-unused-vars */
const store = useStore();

const storeForm3 = (results, map) => {    
    store.dispatch('form3/updateForm3', new Form3(nav.value, results, map))
}

</script>