<script setup>
 import { confirm } from 'src/helpers';

 const emit = defineEmits(['cancel', 'confirm'])
defineProps(({
    itemName: String
}))
</script>

<template>
<q-dialog v-model="confirm" persistent>
    <q-card>
    <q-card-section class="row items-center">
        <span class="q-ml-sm">Вы действительно хотите удалить нейросеть <b>{{itemName}}</b>?</span>
    </q-card-section>

    <q-card-actions align="right">
        <q-btn v-close-popup flat label="Отменить" color="primary" @click="emit('cancel')"/>
        <q-btn v-close-popup flat label="Да" color="primary" @click="emit('confirm')"/>
    </q-card-actions>
    </q-card>
</q-dialog>
</template>
