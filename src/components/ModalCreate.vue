<script setup>
import { computed, nextTick, reactive } from 'vue'
import { initFlowbite } from 'flowbite'
import { useNotesStore } from '@/stores/notes'
import IconAdd from './icons/IconAdd.vue'
import IconClose from './icons/IconClose.vue'

const note = reactive({
  title: '',
  body: ''
})

const isFormInvalid = computed(() => {
  return note.title === '' || note.body === ''
})
const btnDisable = computed(() =>
  isFormInvalid.value
    ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
)

const submit = async () => {
  useNotesStore().addNotes(note)
  document.getElementById('close-modal').click()

  note.title = ''
  note.body = ''

  await nextTick() // This ensures that the DOM is fully updated before calling initFlowbite
  initFlowbite() // re-initializes the Flowbite components
}
</script>

<template>
  <!-- Main modal -->
  <div
    id="create-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full p-4">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create New Notes</h3>
          <button
            id="close-modal"
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="create-modal"
          >
            <IconClose />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="submit">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="col-span-2">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Title
              </label>
              <input
                v-model="note.title"
                type="text"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type notes title"
                required
              />
            </div>

            <div class="col-span-2">
              <label
                for="notes"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Notes
              </label>
              <textarea
                v-model="note.body"
                id="notes"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your notes here"
              ></textarea>
            </div>
          </div>
          <button
            :disabled="isFormInvalid"
            type="submit"
            class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :class="btnDisable"
          >
            <IconAdd />
            Add new notes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
