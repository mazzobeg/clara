<template>
    <form @submit.prevent="next">
        <div class="mb-3">
            <label class="form-label" for="characterName">Nom du personnage</label>
            <input class="form-control" type="text" id="characterName" name="characterName" @input="updateCharacterName" :value="characterName">
        </div>
        <div class="mb-3">
            <label class="form-label" for="characterName">Nom du joueur</label>
            <input class="form-control" type="text" id="playerName" name="playerName" @input="updatePlayerName" :value="playerName">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup>
import { computed , defineEmits} from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const emit = defineEmits(['next'])
const next = () => emit('next')

//const handleUpdate = (event) => emit('update:characterName', event.target.value)
const characterName = computed(() => store.getters['characterForm1/characterName'])
const updateCharacterName = (event) => 
    store.commit('characterForm1/setCharacterName', event.target.value)

const playerName = computed(() => store.getters['characterForm1/playerName'])
const updatePlayerName = (event) => 
    store.commit('characterForm1/setPlayerName', event.target.value)
    
</script>