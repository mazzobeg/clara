<template>
    <div class="row mt-3">
        <div class="col d-flex justify-content-start">
            <button class="btn btn-secondary" @click="previous">Précédent</button>
        </div>
        <div class="col d-flex justify-content-end">
            <button class="btn btn-primary" @click="next">Suivant</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['next', 'previous'])
const next = () => emit('next')
const previous = () => emit('previous')
</script>