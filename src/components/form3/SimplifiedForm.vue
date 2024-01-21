<template>
    <div class="container bg-light py-2">
           <div class="mb-2">
        <label class="form-label" for="selectedGroup15"> {{ abilitiesValues[0] }}</label>
        <select @change="event => updateResults(abilitiesValues[0], event)" id="selectedGroup15" class="form-select" v-model="selectedGroup15">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label" for="selectedGroup10"> {{ abilitiesValues[1] }} </label>
        <select @change="event => updateResults(abilitiesValues[1], event)" id="selectedGroup14" class="form-select" v-model="selectedGroup14">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label" for="selectedGroup10"> {{ abilitiesValues[2] }} </label>
        <select @change="event => updateResults(abilitiesValues[2], event)" id="selectedGroup13" class="form-select" v-model="selectedGroup13">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label" for="selectedGroup10"> {{ abilitiesValues[3] }} </label>
        <select @change="event => updateResults(abilitiesValues[3], event)" id="selectedGroup12" class="form-select" v-model="selectedGroup12">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label" for="selectedGroup10"> {{ abilitiesValues[4] }} </label>
        <select @change="event => updateResults(abilitiesValues[4], event)" id="selectedGroup10" class="form-select" v-model="selectedGroup10">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <div class="mb-2">
        <label class="form-label" for="selectedGroup10"> {{ abilitiesValues[5] }} </label>
        <select @change="event => updateResults(abilitiesValues[5], event)" id="selectedGroup8" class="form-select" v-model="selectedGroup8">
            <template v-for="(abilityValue, abilityKey, index) in STUB" :key="index">
                <option :disabled="otherSelectedGroupsContainsAbility(abilityKey)" :value="abilityKey">{{ abilityValue }}
                </option>
            </template>
        </select>
    </div>

    <button class="btn btn-danger mt-2" @click="resetSelectedGroups">Reset</button> 
    </div>



</template>

<script setup>
import { computed, defineEmits } from 'vue';
import { defineProps } from 'vue';
import store from '@/store';

const emit = defineEmits(['storeForm3']);

const STUB = {
    'str': 'Force',
    'dex': 'Dextérité',
    'con': 'Constitution',
    'int': 'Intelligence',
    'wis': 'Sagesse',
    'cha': 'Charisme'
}

const results = computed(() => {
    const storedForm3 = store.getters['form3/form3'];
    if (storedForm3.mode == 'm-simple' || storedForm3.mode == 'm-classic') {
        return JSON.parse(JSON.stringify(storedForm3.results));
    } else  {
        return {
            'str': 0,
            'dex': 0,
            'con': 0,
            'int': 0,
            'wis': 0,
            'cha': 0
        }
    }
})

const props = defineProps(['abilitiesValues']);
const abilitiesValues = computed(()=> {
    return props.abilitiesValues
});

const selectedGroup15 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[0]);
    if (entry.length == 0) return '';
    return entry[0][0]
});

const selectedGroup14 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[1]);
    if (entry.length == 0) return '';
    return entry[0][0]
});

const selectedGroup13 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[2]);
    if (entry.length == 0) return '';
    return entry[0][0]
    
});

const selectedGroup12 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[3]);
    if (entry.length == 0) return '';
    return entry[0][0]
    
});

const selectedGroup10 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[4]);
    if (entry.length == 0) return '';
    return entry[0][0]
    
});

const selectedGroup8 = computed(() => {
    const entry = Object.entries(results.value).filter((entry) => entry[1] == abilitiesValues.value[5]);
    if (entry.length == 0) return '';
    return entry[0][0]
    
});

const otherSelectedGroupsContainsAbility = (ability) => {
    const selectedGroups = [selectedGroup15, selectedGroup14, selectedGroup13, selectedGroup12, selectedGroup10, selectedGroup8];
    return selectedGroups.filter(sG => sG.value == ability).length > 0
}

const resetSelectedGroups = () => {
    emit('storeForm3', {
        'str': 0,
        'dex': 0,
        'con': 0,
        'int': 0,
        'wis': 0,
        'cha': 0
    });
}

const updateResults = (abilityValue, event) => {
    // set to 0 abilities with value abilityValue
    for (const [key, value] of Object.entries(results.value)) {
        if (value == abilityValue) {
            results.value[key] = 0;
        }
    }
    console.log("updateResults", abilityValue, event.target.value);
    results.value[event.target.value] = abilityValue;
    console.log(results.value);
    // const map = {
    //     [abilitiesValues.value[0]] : selectedGroup15.value,
    //     [abilitiesValues.value[1]] : selectedGroup14.value,
    //     [abilitiesValues.value[2]] : selectedGroup13.value,
    //     [abilitiesValues.value[3]] : selectedGroup12.value,
    //     [abilitiesValues.value[4]] : selectedGroup10.value,
    //     [abilitiesValues.value[5]] : selectedGroup8.value
    // }
    emit('storeForm3', results.value, {});
}

</script>