<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { date } from 'quasar';

import { listsNeuronStore } from 'stores/listsNeuronStore.js';
import { editNeuronStore } from 'stores/editNeuronStore.js';
import { columns } from 'src/libs/tableLibs';
import { confirm } from 'src/helpers';

import SelectListsNeuron from 'components/btn/SelectListsNeuron.vue';
import WdWrapper from 'src/widgets/WdWrapper.vue';
import WdDialog from 'src/widgets/WdDialog.vue';

const { filterRows, loadData, selectedDel } = storeToRefs(listsNeuronStore());
const { editNeuron } = storeToRefs(editNeuronStore());
const { getRows, updateACtiveNeuron, delNeuron, delSelectNeuron } = listsNeuronStore();

const router = useRouter();

const selectDelNeuron = ref(null);

onMounted(() => {
    getRows();
});

const getSelectedString = (rows) => {
    return selectedDel.value.length === 0 ? '' : `Выбрано для удаления ${selectedDel.value.length}`
}
</script>

<template>
    <SelectListsNeuron class="q-ma-md"/>
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
            :rows="filterRows"
            :loading="loadData"
            :columns="columns"
            :pagination="{
                rowsPerPage: 10
            }"
            row-key="id"
            selection="multiple"
            :selected-rows-label="getSelectedString"
            v-model:selected="selectedDel"
        >
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>
            <template v-slot:body-cell-active="props">
                    <q-td key="active" :props="props">
                        <q-toggle
                            v-model="props.row.active"
                            color="green"
                            @update:model-value="updateACtiveNeuron(props.row)"
                        />
                    </q-td>
            </template>
            <template v-slot:body-cell-edit="props">
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
            </template>
            <template v-slot:body-cell-createdAt="props">
                    <q-td key="createdAt" :props="props">
                        <span>{{ date.formatDate(props.row.createdAt, 'DD.MM.YYYY hh:mm:ss') }}</span>
                    </q-td>
            </template>
            <template v-slot:body-cell-dateEdit="props">
                    <q-td key="dateEdit" :props="props">
                        <span>{{ date.formatDate(props.row.dateEdit, 'DD.MM.YYYY hh:mm:ss') }}</span>
                    </q-td>
            </template>
            <template
                v-if="selectedDel.length > 0"
                v-slot:bottom-row
            >
                <q-tr>
                    <q-td colspan="100%">
                        <q-btn
                            push
                            color="green"
                            icon="delete"
                            size="12px"
                            @click="delSelectNeuron()"
                        />
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </WdWrapper>
</template>
