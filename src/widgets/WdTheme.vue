<script setup>
import { useQuasar } from 'quasar';

import { toggleTheme } from 'helpers/theme';

const $q = useQuasar();

</script>

<template>
    <q-toggle
        v-model="$q.dark.isActive"
        checked-icon="dark_mode"
        color="dark"
        unchecked-icon="dark_mode"
        @update:model-value="toggleTheme($q.dark.isActive)"
    />
</template>

<style lang='scss' scoped>
.wd-theme {
    position: relative;
    background-color: slateGray;
    box-shadow: -4px 4px 15px inset rgba(0, 0, 0, 0.4);
    width: 120px;
    height: 50px;
    border-radius: 50px;
}
</style>
