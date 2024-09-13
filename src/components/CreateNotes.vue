<script setup>
import ModalCreate from './ModalCreate.vue'
</script>

<template>
  <div class="flex gap-3 p-4 bg-white rounded-lg shadow-md">
    <img class="rounded-full size-10" src="../assets/profile.jpg" alt="user photo" />
    <div
      class="flex-grow px-3 py-2 text-gray-600 bg-gray-100 rounded-full w-fit hover:cursor-pointer hover:bg-gray-200"
      data-modal-target="create-modal"
      data-modal-toggle="create-modal"
    >
      Create notes
    </div>
    <ModalCreate />
  </div>
</template>
