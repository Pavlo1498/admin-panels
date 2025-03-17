<script setup>
 import { storeToRefs } from 'pinia';

import { createNeuronStore } from 'stores/createNeuronStore.js';
import { chapters } from 'src/libs/selectsLibs';

const { createNeuron } = storeToRefs(createNeuronStore());
</script>

<template>
    <div>
        <q-card class="create-input q-pa-md">
            <div class="q-mb-md"><font size="4">Описание плитки</font></div>
            <div class="create-input__content">
                <div class="create-input__left-block">
                    <q-input
                        v-model="createNeuron.name"
                        outlined
                        label="Название"
                    />
                    <q-input
                        v-model="createNeuron.description"
                        outlined
                        label="Описание"
                    />
                    <q-input
                        v-model="createNeuron.apiRequest"
                        outlined
                        label="api-запрос"
                    />
                    <q-select
                        v-model="createNeuron.chapter"
                        outlined
                        :options="chapters"
                        label="Раздел"
                    />
                </div>
            </div>
        </q-card>
    </div>
</template>

<style lang='scss' scoped>
.create-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__content {
        display: flex;
        flex: 1;
        justify-content: space-between;
    }

    &__left-block {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 400px;
    }
}
</style>
