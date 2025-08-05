<template>
  <div>
    <label v-for="option in options" :key="option">
      <input
        type="checkbox"
        :value="option"
        :checked="modelValue.includes(option)"
        @change="toggle(option)"
      />
      {{ option }}
    </label>
  </div>
</template>

<script setup>
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  function toggle(option) {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(option);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option);
    }

    emit("update:modelValue", newValue);
  }
</script>
