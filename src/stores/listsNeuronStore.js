import axios from 'axios';

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const listsNeuronStore = defineStore('listsNeuronStore', () => {
    const loadData = ref(true);
    const rows = ref([]);

    const getRows = async () => {
        try {
            loadData.value = true;
            const resp = await axios({
                method: 'get',
                url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
            })

            rows.value = resp.data
            loadData.value = false;
        } catch (error) {
            console.log(error);
            loadData.value = false;
        }
    }

    return{
        // state
        loadData,
        rows,

        //methods
        getRows,
    };
});
