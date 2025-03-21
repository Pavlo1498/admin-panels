import axios from 'axios';

import { computed, ref, Ref } from 'vue';
import { resource } from 'src/libs/resourceLib';

export const leftDrawerOpen: Ref<boolean> = ref(true);
export const dsblBtn: Ref<boolean> = ref(true);
export const confirm: Ref<boolean> = ref(false);

export const isValid = computed(() => (val: string): boolean => {
    const result = val.match(/^[a-zA-Z]+$/) !== null;
    dsblBtn.value = result;

    return result;
});

export const pushNeuronMockApi = async (): Promise<void> => {
    await axios({
        method: 'POST',
        url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
        data: {
            ...resource
        }
    });
};
