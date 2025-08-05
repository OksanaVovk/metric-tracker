<template>
  <div>
    <label v-for="option in options" :key="option">
      <input
        type="radio"
        :name="name"
        :value="option"
        :checked="option === modelValue"
        @change="$emit('update:modelValue', option)"
      />
      {{ option }}
    </label>
  </div>
</template>

<script setup>
  defineProps({
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
  });
</script>
