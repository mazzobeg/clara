"<template>
    <div class="mb-3">
        <label class="form-label" for="characterName">Selection de l'historique</label>
        <select class="form-select" @input="(event) => store.dispatch('form4/updateHistoric', event.target.options[event.target.options.selectedIndex].id.split('-')[1])">
            <option id="option-default" value="">-</option>
            <option :selected="v['key'] == historicChoices.name" :id="`option-${v['key']}`"  v-for="(v, index) in bgProto" :key="index" :value="v['name']">{{ v["name"] }}</option>
        </select>
    </div>
    <div>
        <SubChoice
        v-if="historicChoices.name != 'default' && Object.values(store.getters['form4/choices']).find(c => c.length > 0)"
        :choices="bgProto.find(bg => bg.key == historicChoices.name) ? bgProto.find(bg => bg.key == historicChoices.name).choices : []"
        :key="historicChoices.name"
        :state="choices"
        @update:choices="(value) => updateHistoricChoices(value)"
        />
    </div>
    <FormController @next="emit('next')" @previous="emit('previous')"/>
</template>

<script setup>
import FormController from './FormController.vue';
import { useStore } from 'vuex';
import SubChoice from './SubChoice.vue';
import { computed, defineEmits} from 'vue';

import { PROTOTYPE } from '@/api/models/background';

console.log(PROTOTYPE);

const emit = defineEmits(['next', 'previous'])
const bgProto = PROTOTYPE;

const store = useStore();
const historicChoices = computed(() =>  store.getters['form4/historicChoices'])
const choices = computed(() => store.getters['form4/choices'])
const updateHistoricChoices = (value) => {
    store.dispatch('form4/updateHistoricChoices', value)
}
</script>"