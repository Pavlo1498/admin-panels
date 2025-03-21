import axios from 'axios';

import { computed, ref } from 'vue';
import { resource } from 'src/libs/resourceLib';

export const leftDrawerOpen = ref(true);
export const disableBtn = ref(true);
export const confirm = ref(false);

export const isValid = computed(() => (val) => {
    const result = val.match(/^[a-zA-Z]+$/) !== null;
    disableBtn.value = result;

    return result;
});

export const pushNeuronMockApi = async () => {
    await axios({
        method: 'POST',
        url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
        data: {
            ...resource
        }
    });
};
