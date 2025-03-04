import axios from 'axios';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { listsNeuronStore } from 'stores/listsNeuronStore.js';

export const createNeuronStore = defineStore('createNeuronStore', () => {
    const loadData = ref(true);
    const createNeuron = ref({
        active: true,
        external: false,
        newTile: true,
        popular: false,
        name: '',
        description: '',
        image: null
    });

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

            await listsNeuronStore().getRows()
        } catch (error) {
            console.log(error);
        }
    }

    return{
        // state
        createNeuron,
        loadData,

        //methods
        addNeuron,
    };
});
