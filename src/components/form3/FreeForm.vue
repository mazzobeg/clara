<template>
    <div class="container border bg-light py-2">
        <div>
            <span :class="currentPoints > 27 ? 'text-danger' : ''">{{ currentPoints }} / 27</span>
        </div>

        <div class="my-2" v-for="(aV, aK, aI) in STUB" :key="aI">
            <div class="d-flex justify-content-between">
                <button @click="decrement(aK)" type="button" class="btn btn-outline-primary">-</button>
                <span>{{ `${aV} (${results[aK]})` }}</span>
                <button @click="increment(aK)" type="button" class="btn btn-outline-primary">+</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import store from '@/store';
import { computed, defineEmits } from 'vue';

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
    if (storedForm3.mode == 'm-free') {
        return JSON.parse(JSON.stringify(storedForm3.results));
    } else {
        return {
            'str': 8,
            'dex': 8,
            'con': 8,
            'int': 8,
            'wis': 8,
            'cha': 8
        }
    }
})

const pointsCost = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
}

const currentPoints = computed(() => {
    let total = 0;
    for (const value of Object.values(results.value)) {
        total += pointsCost[value];
    }
    return total;
})

const increment = (ability) => {
    if (results.value[ability] < 15) {
        results.value[ability] += 1;
    }
    emit('storeForm3', results.value);
}

const decrement = (ability) => {
    if (results.value[ability] > 8) {
        results.value[ability] -= 1;
    }
    emit('storeForm3', results.value, {});
}

</script>