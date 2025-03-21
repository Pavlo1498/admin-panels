<script setup>
 import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

import { editNeuronStore } from 'stores/editNeuronStore.js';
import { dsblBtn, isValid } from 'src/helpers';
import { types } from 'src/libs/selectsLibs';

 const { thisEditNeuron } = storeToRefs(editNeuronStore());

 const addParam = ref({
    name: '',
    type: ''
});

watchEffect(() => {
    if (addParam.value.type === 'select') {
        return addParam.value.array = [{
            name: '',
            value: ''
        }];
    }

    if (addParam.value?.array) delete addParam.value['array'];
});

const disableBtn = computed(() => {
    return addParam.value.name !== '' && addParam.value.type !== '';
});

const addSetting = (set) => {
    if (set.type === 'input') {
        thisEditNeuron.value.settings.push({
            type: 'input',
            props: {
                placeholder: set.name,
                value: ''
            }
        });
      }

     if (set.type === 'select') {
        thisEditNeuron.value.settings.push({
          type: 'select',
          props: {
                options: [...set.array],
                label: set.name
            }
        });
      }

     if (set.type === 'checkBox') {
        thisEditNeuron.value.settings.push({
            type: 'checkBox',
            props: {
                label: set.name,
                value: false
            }
        });
      }

    addParam.value.name = '';
    addParam.value.type = '';
};

const delSetting = (index) => thisEditNeuron.value.settings.splice(index, 1);
const delParam = (index) => {
    addParam.value.array.splice(index, 1);

    if (addParam.value.array.length === 0) {
        addParam.value.type = '';
        dsblBtn.value = true;
        delete addParam.value.array;
    }
};
</script>

<template>
    <div class=''>
        <q-card class="q-pa-md">
            <div class="q-mb-md"><font size="4">Настройки плитки</font></div>
            <template v-if="thisEditNeuron.settings">
                <div class="flex column q-gutter-sm">
                    <div
                        v-for="(setting, index) in thisEditNeuron.settings"
                        :key="index"
                        class="flex q-gutter-x-sm items-center"
                    >
                        <template v-if="setting.type === 'input'">
                            <q-input
                                v-model="setting.props.value"
                                outlined
                                :label="setting.props.placeholder"
                                :style="{
                                    width: '300px'
                                }"
                            />
                        </template>
                        <template v-if="setting.type === 'select'">
                            <q-select
                                v-model="setting.props.value"
                                outlined
                                :options="setting.props.options"
                                :label="setting.props.label"
                                option-label="name"
                                :style="{
                                    width: '200px'
                                }"
                            />
                        </template>
                        <template v-if="setting.type === 'checkBox'">
                            <q-checkbox
                                v-model="setting.props.value"
                                :label="setting.props.label"
                            />
                        </template>
                        <q-icon
                            class="cursor-pointer"
                            color="red"
                            name="cancel"
                            size="24px"
                            @click="delSetting(index)"
                        />
                    </div>
                </div>
            </template>
            <div class="q-mt-md">
                <div class="flex q-gutter-md items-center">
                    <div><font size="4">Новый параметр</font></div>
                    <div class="flex q-gutter-x-sm">
                        <q-input
                            v-model="addParam.name"
                            outlined
                            label="Название"
                        />
                        <q-select
                            v-model="addParam.type"
                            outlined
                            :options="types"
                            label="Выберите тип поля:"
                            :style="{
                                width: '200px'
                            }"
                        />
                    </div>
                    <q-btn
                        push
                        color="green"
                        icon="add_circle"
                        size="12px"
                        :disable="!disableBtn"
                        @click="addSetting(addParam)"
                    />
                </div>
                <template v-if="addParam.type === 'select'">
                    <div class="q-gutter-sm">
                        <span>заполните массив данными</span>
                        <div
                            v-for="(arr, index) in addParam.array"
                            :key="index"
                            class="flex q-gutter-sm"
                        >
                            <q-input
                                v-model="arr.name"
                                outlined
                                style="width: 200px;"
                                error-message="Имя должно содержать только буквы и быть на Латинице"
                                :error="!isValid(arr.name)"
                                label="Название"
                            />
                            <q-input
                                v-model="arr.value"
                                outlined
                                :rules="[ val => val.length <= 20 || 'Please use maximum 20 characters']"
                                label="Значение"
                            />
                            <q-icon
                                class="cursor-pointer q-mt-lg"
                                color="red"
                                name="cancel"
                                size="24px"
                                @click="delParam(index)"
                            />
                        </div>
                        <q-btn
                            push
                            color="green"
                            icon="add"
                            no-caps
                            size="12px"
                            label="Добавить поле"
                            @click="addParam.array.push({
                                name: '',
                                value: ''
                            })"
                        />
                    </div>
                </template>
            </div>
        </q-card>
    </div>
</template>
