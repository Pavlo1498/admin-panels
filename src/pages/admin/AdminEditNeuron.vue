<script setup>
import { watch, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { editNeuronStore } from 'stores/editNeuronStore.js';
import { dsblBtn } from 'src/helpers';

import EditNeuronSettings from 'components/editNeuron/EditNeuronSettings.vue';
import EditNeuronInput from 'components/editNeuron/EditNeuronInput.vue';
import EditNeuronInfo from 'components/editNeuron/EditNeuronInfo.vue';
import WdWrapper from 'src/widgets/WdWrapper.vue';
import WdHr from 'src/widgets/WdHr.vue';

const { editNeuron, hasChanged, thisEditNeuron } = storeToRefs(editNeuronStore());
const { updateNeuron, mounting } = editNeuronStore();

const router = useRouter();

watch(thisEditNeuron, (newVal) => {
        hasChanged.value = JSON.stringify(newVal) !== JSON.stringify(editNeuron.value);
    },{ deep: true }
);

if (!editNeuron.value) router.push('lists');
else {
    mounting();
}

onUnmounted(() => {
    dsblBtn.value = true;
});
</script>

<template>
    <WdWrapper v-if="editNeuron">
        <span>
            <font size="6">Редактирование: {{ editNeuron.name }}</font>
        </span>
        <EditNeuronInfo />
        <WdHr />
        <EditNeuronInput class="q-mb-md"/>
        <WdHr />
        <EditNeuronSettings />
        <q-space />
        <q-btn
            class="q-ml-auto"
            color="positive"
            :disable="!hasChanged || !dsblBtn"
            label="Сохранить"
            style="width: 200px;"
            @click="updateNeuron()"
        />
    </WdWrapper>
</template>
