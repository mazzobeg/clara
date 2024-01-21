<template>
    <div class="my-3 bg-light border rounded border-primary pt-3 px-3">
        <div class="mb-3 border-start border-primary border-2 ps-3" v-for="(choiceGroup, choiceType, index) in nonEmptyChoices"
            :key="index">
            <h3 class="fs-6">
                Choix des {{ choiceType }}
            </h3>

            <div v-for="(choice, subIndex) in choiceGroup" :key="`sub-${subIndex}`">
                <label class="form-label me-3" for="characterName">
                    <span class="badge rounded-pill text-bg-primary">
                        {{ choice.number - localState[choiceType].find(c => c.id == choice.id).values.length }}
                    </span>
                </label>
                <div class="form-check form-check-inline" v-for="(value, i) in choice.values" :key="i">
                    <input class="form-check-input" type="checkbox" name="" id=""
                         v-model="localState[choiceType].filter(c => c.id == choice.id)[0].values"
                        @change="checkLimit(localState[choiceType].find(c => c.id == choice.id))" :value="toRaw(value)">
                    <label for="">{{ value.name }}</label>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { ref, defineProps, defineEmits, toRaw, computed } from 'vue'
import { useStore } from 'vuex'
import { Choices } from '@/api/typeNew';

/* eslint-disable no-unused-vars */
const store = useStore();

const props = defineProps(['choices', 'state'])
const choices = ref(props.choices)
console.log("CHOICES", props.choices);

const nonEmptyChoices = computed(() => {
    const result = {};
    for (const key in choices.value) {
        if (Array.isArray(choices.value[key]) && choices.value[key].length > 0) {
            result[key] = choices.value[key];
        }
    }
    return result;
});
console.log("NON-EMPTY CHOICES", nonEmptyChoices.value);

/* eslint-disable no-unused-vars */
const emit = defineEmits(['update:choices'])

const state = ref(props.state);
console.log("STATE", state);

const localState = ref(JSON.parse(JSON.stringify(state.value)));

// const selectedChoices = ref({})

// for (const key in choices.value) {
//     for (const subKey in choices.value[key]) {
//         const refKey = `${key}-${subKey}`
//         selectedChoices.value[refKey] = ref([])
//     }
// }

//console.log("init", selectedChoices.value);

const checkLimit = (choice) => {
    if (choice.values.length > choice.number) {
        choice.values.pop()
    }
    console.log("CHECKLIMT 1", localState.value);

    const result = Choices.fromJson(JSON.parse(JSON.stringify(localState.value)))

    console.log("CHECKLIMT 2", result);
    
    emit("update:choices", result)
}
</script>