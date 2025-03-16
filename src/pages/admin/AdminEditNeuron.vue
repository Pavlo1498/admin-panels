<script setup>
import { onMounted, watch} from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { editNeuronStore } from 'stores/editNeuronStore.js';

import EditNeuronSettings from 'components/editNeuron/EditNeuronSettings.vue';
import EditNeuronInfo from 'components/editNeuron/EditNeuronInfo.vue';
import WdWrapper from 'src/widgets/WdWrapper.vue';
import WdHr from 'src/widgets/WdHr.vue';

const { editNeuron, hasChanged, thisEditNeuron} = storeToRefs(editNeuronStore());
const { updateNeuron } = editNeuronStore();

const router = useRouter();

watch(thisEditNeuron, (newVal) => {
        hasChanged.value = JSON.stringify(newVal) !== JSON.stringify(editNeuron.value);
    },{ deep: true }
);
onMounted(() => {
   if (!editNeuron.value) return router.push('lists')
});
</script>

<template>
<WdWrapper v-if="editNeuron">
    <span>
        <font size="6">Редактирование: {{ editNeuron.name }}</font>
    </span>
    <EditNeuronInfo />
    <WdHr />
    <EditNeuronSettings />
    <q-space />
    <q-btn
        class="q-ml-auto"
        color="positive"
        :disable="!hasChanged"
        label="Сохранить"
        style="width: 200px;"
        @click="updateNeuron()"
    />
</WdWrapper>
</template>
