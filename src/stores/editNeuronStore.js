import axios from 'axios';

import { watchEffect, ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

import Router from 'src/router/index.js';

export const editNeuronStore = defineStore('editNeuronStore', () => {
    const thisEditNeuron = ref(null);
    const editNeuron = ref(null);
    const hasChanged = ref(false);
    const loadData = ref(true);

    const updateNeuron = async() => {
        try {
            thisEditNeuron.value.dateEdit = new Date().getTime();

            await axios({
                method: 'put',
                url: `https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons/${thisEditNeuron.value.id}`,
                data: {
                    ...thisEditNeuron.value
                }
            });

            Notify.create({
                progress: true,
                message: `Плитка ${thisEditNeuron.value.name} обновлена`,
                icon: 'done',
                color: 'white',
                textColor: 'green'
            });

            Router.push('lists');
        } catch (error) {
            console.log(error);
        }
    };

    watchEffect(() => {
        if (editNeuron.value) {
            thisEditNeuron.value = { ...editNeuron.value };
            thisEditNeuron.value.settings = [...editNeuron.value.settings];
        }
    });

    return{
        // state
        thisEditNeuron,
        editNeuron,
        hasChanged,
        loadData,

        //methods
        updateNeuron
    };
});
