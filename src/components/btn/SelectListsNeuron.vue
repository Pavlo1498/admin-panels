<script setup>
import { listsNeuronStore } from 'stores/listsNeuronStore.js';

import { selectLists, selectNeurons } from 'src/helpers/selectListsHelp';

const { selectFilter } = listsNeuronStore();

</script>

<template>
    <q-select
        v-model="selectNeurons"
        outlined
        multiple
        style="max-width: 500px;"
        use-chips
        option-label="name"
        option-value="id"
        :options="selectLists"
        label="Нейросети"
        @update:model-value="selectFilter"
    />
</template>
