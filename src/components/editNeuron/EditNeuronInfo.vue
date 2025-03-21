<script setup>
import { storeToRefs } from 'pinia';

import { editNeuronStore } from 'stores/editNeuronStore.js';

const { thisEditNeuron } = storeToRefs(editNeuronStore());
</script>

<template>
    <div class="q-pa-md">
        <q-checkbox
            v-model="thisEditNeuron.active"
            label="Активна"
        />
        <q-checkbox
            v-model="thisEditNeuron.newTile"
            label="Новая плитка"
        />
        <q-checkbox
            v-model="thisEditNeuron.external"
            label="Внешний сервис"
        />
        <q-checkbox
            v-model="thisEditNeuron.popular"
            label="Популярная"
        />
    </div>
</template>

