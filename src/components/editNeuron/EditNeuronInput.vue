<script setup>
 import { storeToRefs } from 'pinia';

 import { editNeuronStore } from 'stores/editNeuronStore.js';
 import { types } from 'src/libs/selectsLibs';

const { thisEditNeuron, errors } = storeToRefs(editNeuronStore());
</script>

<template>
    <div class="flex">
        <div
            class="q-gutter-sm"
            style="width: 350px;"
        >
            <q-input
                v-model="thisEditNeuron.name"
                outlined
                label="Название"
                :class="{
                    'my-special-class': errors?.name
                }"
            />
            <span class="error">{{ errors?.name }}</span>
            <q-input
                v-model="thisEditNeuron.description"
                outlined
                label="Описание"
                :class="{
                    'my-special-class': errors?.description
                }"
            />
            <span class="error">{{ errors?.description }}</span>
            <q-input
                v-model="thisEditNeuron.api"
                outlined
                label="api-запрос"
            />
            <q-select
                v-model="thisEditNeuron.chapter"
                outlined
                :options="types"
                label="Раздел"
            />
        </div>
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
