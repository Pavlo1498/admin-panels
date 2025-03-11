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
    <div class="flex">
        <div
            class="q-gutter-sm"
            style="width: 350px;"
        >
            <q-input
                v-model="thisEditNeuron.name"
                outlined
                label="Название"
            />
            <q-input
                v-model="thisEditNeuron.description"
                outlined
                label="Описание"
            />
            <q-input
                v-model="thisEditNeuron.api"
                outlined
                label="api-запрос"
            />
            <q-select
                v-model="thisEditNeuron.chapter"
                outlined
                :options="options"
                label="Раздел"
            />
        </div>
        <q-space />
        <div>
            <q-uploader
                color="primary"
                flat
                bordered
                style="max-width: 300px"
                @added="upload"
            />
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>
