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
        <div class="mb-3">
            <label class="form-label" for="alignment">Alignement</label>
            <select class="form-select" name="alignment" id="alignment" @change="updateAlignment" :value="alignment">
                <option value="">Choisir un alignment</option>
                <option value="Loyal Bon">Loyal Bon</option>
                <option value="Neutre Bon">Neutre Bon</option>
                <option value="Chaotique Bon">Chaotique Bon</option>
                <option value="Loyal Neutre">Loyal Neutre</option>
                <option value="Neutre">Neutre</option>
                <option value="Chaotique Neutre">Chaotique Neutre</option>
                <option value="Loyal Mauvais">Loyal Mauvais</option>
                <option value="Neutre Mauvais">Neutre Mauvais</option>
                <option value="Chaotique Mauvais">Chaotique Mauvais</option>
            </select>
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

const characterName = computed(() => store.getters['characterForm1/characterName'])
const updateCharacterName = (event) => 
    store.commit('characterForm1/setCharacterName', event.target.value)

const playerName = computed(() => store.getters['characterForm1/playerName'])
const updatePlayerName = (event) => 
    store.commit('characterForm1/setPlayerName', event.target.value)

const alignment = computed(() => store.getters['characterForm1/alignment'])
const updateAlignment = (event) => 
    store.commit('characterForm1/setAlignment', event.target.value)
    
</script>