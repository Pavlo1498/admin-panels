<script setup>
 import { storeToRefs } from 'pinia';

import { createNeuronStore } from 'stores/createNeuronStore.js';
import { chapters } from 'src/libs/selectsLibs';

const { createNeuron, errors } = storeToRefs(createNeuronStore());
</script>

<template>
    <div>
        <q-card class="create-input q-pa-md">
            <div class="q-mb-md"><font size="4">Описание плитки</font></div>
            <div class="create-input__content">
                <form class="create-input__left-block">
                    <q-input
                        v-model="createNeuron.name"
                        outlined
                        type="text"
                        filled
                        :class="{
                            'my-special-class': errors.name
                        }"
                        label="Название"
                    />
                    <span class="error">{{ errors.name }}</span>
                    <q-input
                        v-model="createNeuron.description"
                        outlined
                        filled
                        label="Описание"
                        :class="{
                            'my-special-class': errors.description
                        }"
                    />
                    <span class="error">{{ errors.description }}</span>
                    <q-select
                        v-model="createNeuron.chapter"
                        outlined
                        filled
                        :options="chapters"
                        label="Раздел"
                    />
                    <q-input
                        v-model="createNeuron.apiRequest"
                        outlined
                        filled
                        label="api-запрос"
                    />
                </form>
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
        gap: 4px;
        width: 400px;
    }
}
</style>
