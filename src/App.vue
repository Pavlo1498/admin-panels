<script setup>
import { onMounted } from 'vue';

import { checkTheme } from './helpers/theme';

onMounted(() => {
  checkTheme();
});
</script>

<template>
    <div class=''>
        <router-view />
    </div>
</template>

<style lang='scss' scoped></style>
