<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true
  }
})

const btnDisable = computed(() =>
  props.disabled
    ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
)
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
