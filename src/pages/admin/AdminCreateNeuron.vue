<script setup>
 import { storeToRefs } from 'pinia';
 import { computed, onUnmounted} from 'vue';

 import { createNeuronStore } from 'stores/createNeuronStore.js';

 import CreateNeuronSettings from 'components/createNeuron/CreateNeuronSettings.vue';
 import CreateNeuronCheckBox from 'components/createNeuron/CreateNeuronCheckBox.vue';
 import CreateNeuronInput from 'components/createNeuron/CreateNeuronInput.vue';
 import WdWrapper from 'src/widgets/WdWrapper.vue';
 import WdHr from 'src/widgets/WdHr.vue';

 const { createNeuron } = storeToRefs(createNeuronStore());
 const { addNeuron, clearCreated } = createNeuronStore();

const disableBtnCreate = computed(() => createNeuron.value.name !== '' && createNeuron.value.chapter !== '');

onUnmounted(() => {
    clearCreated()
});
</script>

<template>
    <WdWrapper>
        <div class="q-mb-md">
            <font size="5">
                Создание нейросети
            </font>
        </div>
        <WdHr  />
        <CreateNeuronCheckBox class="q-mb-md"/>
        <WdHr />
        <CreateNeuronInput class="q-mb-md"/>
        <WdHr />
        <CreateNeuronSettings />
        <q-space />
        <q-btn
            class="q-ml-auto q-my-md"
            color="positive"
            label="Сохранить"
            :disable="!disableBtnCreate"
            style="width: 200px;"
            @click="addNeuron"
        />
    </WdWrapper>
</template>
