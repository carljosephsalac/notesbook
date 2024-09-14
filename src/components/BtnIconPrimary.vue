<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
  btnDisable: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    type="submit"
    class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    :class="btnDisable"
  >
    <slot></slot>
  </button>
</template>
