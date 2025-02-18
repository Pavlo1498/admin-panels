<script setup>
import { leftDrawerOpen } from 'src/helpers';

import WdTheme from 'src/widgets/WdTheme.vue';
</script>

<template>
    <q-header
        elevated
        dark
        class="text-white"
    >
        <q-toolbar>
            <q-btn
                dense
                flat
                round
                :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
                @click="leftDrawerOpen = !leftDrawerOpen"
            />

            <q-space />
            <WdTheme />
        </q-toolbar>
    </q-header>
</template>
