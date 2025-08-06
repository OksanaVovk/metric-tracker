<template>
  <Dialog
    v-model:visible="modelValue"
    modal
    header="Experiment Details"
    :closable="true"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <slot></slot>
  </Dialog>
</template>

<script setup>
  const modelValue = defineModel();
</script>
<style lang="scss">
  .p-dialog {
    background: white;
    color: black;
  }
  .p-dialog .p-dialog-content {
    background: white;
    color: black;
    overflow-x: auto;
    padding: 0 8px;
  }
</style>
