import axios from 'axios';

import { ref } from 'vue';
import { resource } from 'src/libs/resourceLib';

export const leftDrawerOpen = ref(true);

export const pushNeuronMockApi = async () => {
    await axios({
        method: 'POST',
        url: 'https://67b4cd7ea9acbdb38ed07021.mockapi.io/api/neuron/neurons',
        data: {
            ...resource
        }
    })
}
