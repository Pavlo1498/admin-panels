import axios from 'axios';
import * as Yup from 'yup';

import { watch, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

import Router from 'src/router/index.js';

const schema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле')
    .min(3, 'не меньше 3-х символов')
    .max(15, 'не больше 15ти символов'),
    description: Yup.string().max(50, 'не больше 50ти символов')
});

export const editNeuronStore = defineStore('editNeuronStore', () => {
    const thisEditNeuron = ref(null);
    const editNeuron = ref(null);
    const hasChanged = ref(false);
    const loadData = ref(true);
    const errors = reactive({});
    const addParam = ref({
        name: '',
        type: ''
    });

    const updateNeuron = async() => {
        try {
            await schema.validate(thisEditNeuron.value, { abortEarly: false });
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

            addParam.value = {
                 name: '',
                type: ''
            };
            Router.push('lists');
        } catch (validationErrors) {
            validationErrors.inner.forEach(err => {
                errors[err.path] = err.message;
            });

            Notify.create({
                progress: true,
                message: 'Ошибки в форме заполнения',
                icon: 'error',
                color: 'white',
                textColor: 'red'
            });
        }
    };

    const mounting = () => {
        thisEditNeuron.value = { ...editNeuron.value };
        thisEditNeuron.value.settings = [...editNeuron.value.settings];

        for (const key in thisEditNeuron.value) {
            if (key === 'name' || key === 'description') {
                watch(() => thisEditNeuron.value[key], () => {
                    validateField(key);
                    },
                    { immediate: true }
                );
            }
        }
    };

    const validateField = async (field) => {
        try {
            errors[field] = '';
            await schema.validateAt(field, thisEditNeuron.value);
        } catch (err) {
            errors[field] = err.message;
        }
    };

    return{
        // state
        thisEditNeuron,
        editNeuron,
        hasChanged,
        addParam,
        loadData,
        errors,

        //methods
        updateNeuron,
        mounting
    };
});
