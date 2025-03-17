<script setup>

</script>

<template>
    <div class="wd-wrapper q-pa-lg">
        <slot></slot>
    </div>
</template>

<style lang='scss' scoped>
.wd-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    height: 100%;
}
</style>
