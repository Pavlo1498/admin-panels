import axios from 'axios';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { selectLists, selectNeurons } from 'src/helpers/selectListsHelp';

export const listsNeuronStore = defineStore('listsNeuronStore', () => {
    const filterRows = ref([]);
    const loadData = ref(true);
    const rows = ref([]);

    const getRows = async () => {
        try {
            loadData.value = true;
            const resp = await axios({
                method: 'get',
                url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons'
            });

            filterRows.value = resp.data;
            rows.value = resp.data;
            loadData.value = false;
            selectLists.value = resp.data.map((item) => {
                return {
                    name: item.name,
                    id: item.id
                };
        });
        } catch (error) {
            console.log(error);
            loadData.value = false;
        }
    };

    const delNeuron = async (neuron) => {
        await axios({
            method: 'DELETE',
            url: `https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons/${neuron.id}`
        });

        await getRows();
    };

    const updateACtiveNeuron = async (neuron) => {
        await axios({
            method: 'put',
            url: `https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons/${neuron.id}`,
            data: {
                ...neuron
            }
        });

        await getRows();
    };

    const selectFilter = () => {
        if (selectNeurons.value.length > 0) {
            filterRows.value = [];
            selectNeurons.value.forEach(item => filterRows.value.push(...rows.value.filter(neuron => neuron.id === item.id)));

            return;
        }

        filterRows.value = rows.value;
    };

    return{
        // state
        filterRows,
        loadData,

        //methods
        updateACtiveNeuron,
        selectFilter,
        delNeuron,
        getRows
    };
});
