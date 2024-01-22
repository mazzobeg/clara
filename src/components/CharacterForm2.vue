<template>
    <div class="mb-3">
        <label class="form-label" for="characterName">Selection de la race</label>
        <select class="form-select" @input="updateRace">
            <option id="option-default" value="">-</option>
            <option :selected="v['key'] == storedRace.key" :id="`option-${v['key']}`" v-for="(v, index) in PROTOTYPE_RACES"
                :key="index" :value="v['name']">{{ v["name"] }}</option>
        </select>
    </div>
    <div>
    <SubChoice v-if="isRaceSubChoicesDisplayed" :choices="getRaceChoices()" :key="storedRace.key"
            :state="storedRace.choices" @update:choices="updateRaceChoices" />
    </div>
    <div class="mb-3">
        <label class="form-label" for="characterName">Selection de la classe</label>
        <select class="form-select" @input="updateClass">
            <option id="option-default" value="">-</option>
            <option :selected="v['key'] == storedClass.key" :id="`option-${v['key']}`"
                v-for="(v, index) in PROTOTYPE_CLASSES" :key="index" :value="v['name']">{{ v["name"] }}</option>
        </select>
    </div>
    <div>
        <SubChoice v-if="isClassesubChoicesDisplayed" :choices="getClassChoices()" :key="storedClass.key"
        :state="storedClass.choices" @update:choices="updateClassChoices" />
    </div>
    <FormController @next="emit('next')" @previous="emit('previous')" />
</template>

<script setup>
import { defineEmits, computed } from 'vue'
import { useStore } from 'vuex';
import { PROTOTYPE as PROTOTYPE_RACES } from '@/api/models/race.js';
import { PROTOTYPE as PROTOTYPE_CLASSES } from '@/api/models/class.js';
import SubChoice from './SubChoice.vue';
import FormController from './FormController.vue';

const emit = defineEmits(['next', 'previous'])

const store = useStore();

// RACE HANDLING
const storedRace = computed(() => {
    return store.getters['form2/raceState']}
    )

const isRaceSubChoicesDisplayed = computed(() => {
    console.log("isRaceSubChoicesDisplayed", storedRace.value.choices)
    return storedRace.value.key != 'default' && Object.values(storedRace.value.choices).find(c => c.length > 0)
})

const getRaceChoices = () => {
    const isKeyPresent = PROTOTYPE_RACES.find(bg => bg.key == storedRace.value.key)
    const choices = isKeyPresent ? PROTOTYPE_RACES.find(bg => bg.key == storedRace.value.key).choices : []
    return choices
}

const updateRace = (event) => {
    store.dispatch('form2/updateRace', event.target.options[event.target.options.selectedIndex].id.split('-')[1])
}

const updateRaceChoices = (value) => {
    store.dispatch('form2/updateRaceChoices', value)
}

// CLASSE HANDLING
const storedClass = computed(() => store.getters['form2/classState'])

const isClassesubChoicesDisplayed = computed(() => {
    console.log("isClassesubChoicesDisplayed", storedClass.value.key)
    return storedClass.value.key != 'default' && Object.values(storedClass.value.choices).find(c => c.length > 0)
})

const getClassChoices = () => {
    const choices = PROTOTYPE_CLASSES.find(bg => bg.key == storedClass.value.key) ? PROTOTYPE_CLASSES.find(bg => bg.key == storedClass.value.key).choices : []
    return choices
}

const updateClass = (event) => {
    store.dispatch('form2/updateClass', event.target.options[event.target.options.selectedIndex].id.split('-')[1])
}

const updateClassChoices = (value) => {
    store.dispatch('form2/updateClassChoices', value)
}

</script>