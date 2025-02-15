<script setup>
import { leftDrawerOpen } from 'src/helpers';
</script>

<template>
  <q-drawer :dark="false" show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <!-- drawer content -->
  </q-drawer>
</template>

<style lang='scss'>
.q-drawer {
  background: var(--g-color-5) !important;
}
</style>
