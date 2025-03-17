<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { date } from 'quasar'

import { listsNeuronStore } from 'stores/listsNeuronStore.js';
import { editNeuronStore } from 'stores/editNeuronStore.js';
import { columns } from 'src/libs/tableLibs';
import { confirm } from 'src/helpers';

import WdWrapper from 'src/widgets/WdWrapper.vue';
import WdDialog from 'src/widgets/WdDialog.vue';

const { rows, loadData } = storeToRefs(listsNeuronStore());
const { editNeuron } = storeToRefs(editNeuronStore());
const { getRows, updateACtiveNeuron, delNeuron } = listsNeuronStore();

const router = useRouter();

const selectDelNeuron = ref(null);

onMounted(() => {
    getRows()
});
</script>

<template>
    <WdDialog
        v-if="confirm"
        :itemName="selectDelNeuron?.name"
        @confirm="delNeuron(selectDelNeuron), selectDelNeuron = null"
        @cancel="confirm = false, selectDelNeuron = null"
    />
    <WdWrapper>
        <q-table
            flat
            bordered
            title="Нейросети"
            :rows="rows"
            :loading="loadData"
            :columns="columns"
            :pagination="{
                rowsPerPage: 10
            }"
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
                        @update:model-value="updateACtiveNeuron(props.row)"
                    />
                </q-td>
                <q-td key="name" :props="props">
                    <span>{{ props.row.name }}</span>
                </q-td>
                <q-td key="chapter" :props="props">
                    <span>{{ props.row.chapter }}</span>
                </q-td>
                <q-td key="createdAt" :props="props">
                    <span>{{ date.formatDate(props.row.createdAt, 'DD.MM.YYYY hh:mm:ss') }}</span>
                </q-td>
                <q-td key="dateEdit" :props="props">
                    <span>{{ date.formatDate(props.row.dateEdit, 'DD.MM.YYYY hh:mm:ss') }}</span>
                </q-td>
                <q-td key="edit" :props="props">
                    <div class="flex q-gutter-x-sm justify-center">
                        <q-icon
                            class="cursor-pointer"
                            name="edit"
                            size="16px"
                            @click="editNeuron = props.row, router.push('edit-neuron')"
                        />
                        <q-icon
                            class="cursor-pointer"
                            name="delete"
                            size="16px"
                            @click="confirm = true, selectDelNeuron = props.row"
                        />
                    </div>
                </q-td>
            </q-tr>
        </template>
    </q-table>
    </WdWrapper>
</template>
