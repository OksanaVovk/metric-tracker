<!-- components/BuildChartButton.vue -->
<template>
  <button :disabled="disabled" @click="$emit('build')" class="build-btn">
    Build Chart
  </button>
</template>

<script setup>
  defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  defineEmits(["build"]);
</script>

<style scoped lang="scss">
  .build-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #ff8000;
    color: white;
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
      background-color: #e67300;
      cursor: pointer;
    }

    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
  }
</style>
