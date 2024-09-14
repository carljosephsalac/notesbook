<script setup>
import IconClose from './icons/IconClose.vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  toggle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button
    :id="id"
    type="button"
    class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
    :data-modal-toggle="toggle"
  >
    <IconClose />
    <span class="sr-only">Close modal</span>
  </button>
</template>
