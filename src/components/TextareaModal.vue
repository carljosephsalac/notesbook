<script setup>
const model = defineModel()
</script>

<template>
  <textarea
    v-model="model"
    id="notes"
    rows="4"
    class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Write your notes here"
  ></textarea>
</template>
