<script setup>
import { onMounted } from 'vue';

// import { pushNeuronMockApi } from './helpers';
import { checkTheme } from './helpers/theme';
onMounted(async () => {
  checkTheme();

//  await pushNeuronMockApi()
});
</script>

<template>
    <div class=''>
        <router-view />
    </div>
</template>

<style lang='scss' scoped></style>
