<script setup>
 import { storeToRefs } from 'pinia';

import { createNeuronStore } from 'stores/createNeuronStore.js';

const { createNeuron } = storeToRefs(createNeuronStore());

const upload = (file) => createNeuron.image = file[0];

</script>

<template>
    <div>
        <div class="q-mb-md"><font size="4">Описание плитки</font></div>
        <q-card class="create-input q-pa-md">
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
                    <q-select
                        v-model="createNeuron.model"
                        outlined
                        :options="options"
                        label="Раздел"
                    />
                </div>
                <div class="create-input__right-block">
                    <q-uploader
                        color="primary"
                        flat
                        bordered
                        style="max-width: 300px"
                        @added="upload"
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

    &__right-block {
    }
}
</style>
