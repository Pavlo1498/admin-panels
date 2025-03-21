import axios from 'axios';

import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { ref } from 'vue';

import { selectLists, selectNeurons } from 'src/helpers/selectListsHelp';

export const listsNeuronStore = defineStore('listsNeuronStore', () => {
    const selectedDel = ref([]);
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

        Notify.create({
                progress: true,
                message: `Нейросеть ${neuron.name} удалена`,
                icon: 'done',
                color: 'white',
                textColor: 'green'
        });

    };

    const delSelectNeuron = async () => {
        try {
            for (let i = 0; i < selectedDel.value.length + 1; i++) {
                await axios({
                    method: 'DELETE',
                    url: `https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons/${selectedDel.value[0].id}`
                })
                    .then(() => {
                        Notify.create({
                            progress: true,
                            message: `Нейросеть ${selectedDel.value[0].name} удалена`,
                            icon: 'done',
                            color: 'white',
                            textColor: 'green'
                        });

                        selectedDel.value.splice(0, 1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            await getRows();
        } catch (error) {
            console.log(error);
        }
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
        selectedDel,
        filterRows,
        loadData,

        //methods
        updateACtiveNeuron,
        delSelectNeuron,
        selectFilter,
        delNeuron,
        getRows
    };
});
