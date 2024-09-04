<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import CreateNotesModal from '@/components/CreateNotesModal.vue'
import DropDown from '@/components/DropDown.vue'
import EditNotesModal from '@/components/EditNotesModal.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const sampleDate = new Date().toLocaleDateString('en-US', {
  month: 'long', // Full month name (e.g., September)
  day: 'numeric', // Numeric day (e.g., 9)
  year: 'numeric' // Full year (e.g., 2024)
})
</script>

<template>
  <main class="flex flex-col items-center flex-grow h-auto bg-gray-100 pt-7">
    <div class="flex flex-col w-full max-w-2xl gap-4">
      <div class="flex gap-3 p-4 bg-white rounded-lg shadow-md">
        <img class="rounded-full size-10" src="../assets/profile.jpg" alt="user photo" />
        <div
          class="flex-grow px-3 py-2 text-gray-600 bg-gray-100 rounded-full w-fit hover:cursor-pointer hover:bg-gray-200"
          data-modal-target="create-modal"
          data-modal-toggle="create-modal"
        >
          Create notes
        </div>
        <CreateNotesModal />
      </div>

      <div class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
        <div class="flex justify-between">
          <div class="flex">
            <img class="rounded-full size-10 me-2" src="../assets/profile.jpg" alt="user photo" />
            <div class="leading-5">
              <p class="font-semibold font">Carl Joseph Salac</p>
              <small class="text-gray-600">{{ sampleDate }}</small>
            </div>
          </div>
          <DropDown />
          <EditNotesModal />
        </div>

        <p class="font-semibold leading-5">Vue.js Composition API notes</p>

        <div class="p-2 border border-gray-300 rounded-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde aliquam autem minima,
          recusandae ab temporibus maiores nulla. Voluptatum optio accusamus cumque odit
          consequuntur consectetur nihil dolorum perspiciatis, molestias fugiat quam! Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Expedita, magni, mollitia nulla repellat
          molestiae animi adipisci similique, dolorem sint deleniti consectetur tenetur ab
          blanditiis eveniet vero! Facere officiis assumenda minima.
        </div>
      </div>
    </div>
  </main>
</template>
