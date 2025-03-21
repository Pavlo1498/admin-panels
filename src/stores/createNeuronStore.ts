import axios from 'axios';
import * as Yup from 'yup';

import { reactive, watch,  ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

import { listsNeuronStore } from 'stores/listsNeuronStore.js';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Обязательное поле')
    .min(3, 'не меньше 3-х символов')
    .max(15, 'не больше 15ти символов'),
  description: Yup.string().max(50, 'не больше 50ти символов')
});

export const createNeuronStore = defineStore('createNeuronStore', () => {
  const loadData = ref(true);
  const errors = reactive({});

  const addParam = ref({
    name: '',
    type: ''
  });

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
    name: ''
  });

  const createNeuron = ref({ ...staticCreateNeuron.value });

  const addNeuron = async () => {
    try {
      await schema.validate(createNeuron.value, { abortEarly: false });
      createNeuron.value.createdAt = new Date();

      await axios({
        method: 'post',
        url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
        data: {
          ...createNeuron.value
        }
      });

      clearCreated();
      await listsNeuronStore().getRows();

      Notify.create({
        progress: true,
        message: `Плитка ${createNeuron.value.name} создана`,
        icon: 'done',
        color: 'white',
        textColor: 'green'
      });

    } catch (validationErrors) {
      validationErrors.inner.forEach((err) => {
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

  const clearCreated = () => {
    createNeuron.value = staticCreateNeuron.value;
    staticCreateNeuron.value.settings = [];
    createNeuron.value.settings = [];
    addParam.value = {
      name: '',
      type: ''
    };
  };

  const validateField = async (field: string) => {
    try {
      errors[field] = '';
      await schema.validateAt(field, createNeuron.value);
    } catch (err) {
      errors[field] = err.message;
    }
  };

  for (const key in createNeuron.value) {
    if (key === 'name' || key === 'description') {
      watch(
        () => createNeuron.value[key],
        () => {
          validateField(key);
        },
        { immediate: true }
      );
    }
  }

  return {
    // state
    staticCreateNeuron,
    createNeuron,
    addParam,
    loadData,
    errors,

    // methods
    clearCreated,
    addNeuron
  };
});
