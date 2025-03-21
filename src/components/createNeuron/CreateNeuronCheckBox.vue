<script setup>
 import { storeToRefs } from 'pinia';

import { createNeuronStore } from 'stores/createNeuronStore.js';

const { createNeuron } = storeToRefs(createNeuronStore());

</script>

<template>
    <div>
        <q-card class="q-pa-md">
            <div class="q-mb-md"><font size="4">Состояния плитки</font></div>
            <q-checkbox
                v-model="createNeuron.active"
                label="Активна"
            />
            <q-checkbox
                v-model="createNeuron.newTile"
                label="Новая плитка"
            />
            <q-checkbox
                v-model="createNeuron.external"
                label="Внешний сервис"
            />
            <q-checkbox
                v-model="createNeuron.popular"
                label="Популярная"
            />
        </q-card>
    </div>
</template>
