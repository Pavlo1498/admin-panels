<script setup>
import { leftDrawerOpen } from 'src/helpers';

const menuLinks = [
  {
    path: 'lists',
    name: 'Список нейросетей',
    icon: 'table_rows',
    id: 1
  },
  {
    path: 'create',
    name: 'Создание нейросети',
    icon: 'add_circle',
    id: 2
  }
];
</script>

<template>
    <q-drawer
        v-model="leftDrawerOpen"
        :dark="false"
        show-if-above
        side="left"
        bordered
    >
        <q-list bordered>
            <q-item
                v-for="link in menuLinks"
                :key="link.id"
                v-ripple
                clickable
            >
                <q-item-section avatar>
                    <q-icon color="primary" :name="link.icon" />
                </q-item-section>
                <q-item-section>{{ link.name }}</q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<style lang='scss'>
.q-drawer {
  background: var(--g-color-5) !important;
}
</style>
