<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { listsNeuronStore } from 'stores/listsNeuronStore.js';
import { editNeuronStore } from 'stores/editNeuronStore.js';
import { columns } from 'src/libs/tableLibs';

import WdWrapper from 'src/widgets/WdWrapper.vue';

const { rows, loadData } = storeToRefs(listsNeuronStore());
const { editNeuron } = storeToRefs(editNeuronStore());
const { getRows } = listsNeuronStore();

const router = useRouter();

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
            :loading="loadData"
            :columns="columns"
            row-key="id"
        >
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="id" :props="props">
                    <span>{{ props.row.id }}</span>
                </q-td>
                <q-td key="active" :props="props">
                    <q-toggle
                        v-model="props.row.active"
                        color="green"
                    />
                </q-td>
                <q-td key="name" :props="props">
                    <span>{{ props.row.name }}</span>
                </q-td>
                <q-td key="chapter" :props="props">
                    <span>{{ props.row.chapter }}</span>
                </q-td>
                <q-td key="dateEdit" :props="props">
                    <span>{{ props.row.dateEdit }}</span>
                </q-td>
                <q-td key="createdAt" :props="props">
                    <span>{{ props.row.createdAt }}</span>
                </q-td>
                <q-td key="edit" :props="props">
                    <div
                        style="cursor: pointer"
                        @click="editNeuron = props.row, router.push('edit-neuron')"
                    >
                        <q-icon
                            name="edit"
                            size="16px"
                        />
                    </div>
                </q-td>
            </q-tr>
        </template>
    </q-table>
    </WdWrapper>
</template>
