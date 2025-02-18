<script setup>
import axios from 'axios';

import WdWrapper from 'src/widgets/WdWrapper.vue';

import { columns } from 'src/libs/tableLibs';
import { ref, onMounted } from 'vue';

const rows = ref([]);

const getRows = async () => {
    try {
        //
        const resp = await axios({
            method: 'get',
            url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
        })

        rows.value = resp.data
    } catch (error) {
        console.log(error);
    }
}

const addNeuron = async() => {
    try {
        //
        await axios({
            method: 'post',
            url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
            data: {
                id: '11',
            }
        })

        getRows()
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    getRows()
});
</script>

<template>
    <WdWrapper>
        <q-table
            flat
            bordered
            title="Нейросети"
            :rows="rows"
            :columns="columns"
            row-key="id"
        />
        <div @click="addNeuron()">add</div>
    </WdWrapper>
</template>
