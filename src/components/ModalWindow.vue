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
<style lang="scss"></style>
