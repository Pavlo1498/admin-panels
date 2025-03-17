import axios from 'axios';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { listsNeuronStore } from 'stores/listsNeuronStore.js';

export const createNeuronStore = defineStore('createNeuronStore', () => {
    const loadData = ref(true);
    const staticCreateNeuron = ref({
        description: '',
        apiRequest: null,
        createdAt: null,
        external: false,
        settings: [],
        dateEdit: null,
        popular: false,
        chapter: '',
        newTile: true,
        active: true,
        image: null,
        name: '',
    })
    const createNeuron = ref({...staticCreateNeuron.value});

    const addNeuron = async () => {
        try {
            createNeuron.value.createdAt = new Date();

            await axios({
                method: 'post',
                url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
                data: {
                    ...createNeuron.value
                }
            })

            clearCreated();
            await listsNeuronStore().getRows();
        } catch (error) {
            console.log(error);
        }
    }

    const clearCreated = () => {
        createNeuron.value = staticCreateNeuron.value;
        staticCreateNeuron.value.settings = [];
        createNeuron.value.settings = [];
    }

    return{
        // state
        staticCreateNeuron,
        createNeuron,
        loadData,

        //methods
        clearCreated,
        addNeuron,
    };
});
