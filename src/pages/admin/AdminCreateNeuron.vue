<script setup>
import CreateNeuronSettings from 'components/createNeuron/CreateNeuronSettings.vue';
import CreateNeuronCheckBox from 'components/createNeuron/CreateNeuronCheckBox.vue';
import CreateNeuronInput from 'components/createNeuron/CreateNeuronInput.vue';
import WdWrapper from 'src/widgets/WdWrapper.vue';
</script>

<template>
    <WdWrapper>
        <div class="q-mb-md"><font size="5">Создание нейросети</font></div>
        <hr class="q-mb-md"/>
        <CreateNeuronCheckBox class="q-mb-md"/>
        <hr class="q-mb-md"/>
        <CreateNeuronInput class="q-mb-md"/>
        <hr class="q-mb-md"/>
        <CreateNeuronSettings />
    </WdWrapper>
</template>

<style lang='scss' scoped></style>
