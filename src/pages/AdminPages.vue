<script setup>
import AdminHeader from 'src/components/AdminHeader.vue';
import AdminMenu from 'src/components/AdminMenu.vue';


</script>

<template>
    <q-layout view="hHh lpR fFf">
        <AdminHeader />
        <AdminMenu />

        <q-page-container class="admin-pages__container">
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<style lang='scss' scoped>
.admin-pages {
  &__container {
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }
}
</style>
