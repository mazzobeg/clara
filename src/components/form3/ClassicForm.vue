<template>
    <button class="btn btn-primary" @click="roll()">
        <div :class="`${isRolling ? 'rolling' : ''}`">
            <i class="bi bi-dice-1"></i>
        </div>
    </button>

    <SimplifiedForm :abilitiesValues="abilities" 
    @storeForm3="(results, map) => $emit('storeForm3', results, map)"
    />

</template>

<script setup>
import { ref } from 'vue';
import SimplifiedForm from './SimplifiedForm.vue';

const isRolling = ref(false);

const rollD6 = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const abilities = ref([]);

const roll = () => {
    isRolling.value = true;
    
    setTimeout(() => {
        isRolling.value = false;
        abilities.value = [];

        for (let t = 0; t < 6; t++) {
            const rolledList = [];
            for (let i = 0; i < 4; i++) {
                rolledList.push(rollD6());
            }
            // get 3 highest values
            const highestValues = rolledList.sort((a, b) => b - a).slice(0, 3);
            //sum them
            const sum = highestValues.reduce((a, b) => a + b, 0);
            abilities.value.push(sum);
        }

        console.log(abilities.value);
    }, 500);
}

</script>

<style scoped>
.rolling {
    animation: spin 0.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    80% {
        transform: rotate(300deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>