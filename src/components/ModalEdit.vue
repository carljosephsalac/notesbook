<script setup>
import { computed, reactive, nextTick } from 'vue'
import IconClose from './icons/IconClose.vue'
import IconEdit from './icons/IconEdit.vue'
import { useNotesStore } from '@/stores/notes'
import { initFlowbite } from 'flowbite'
import ModalWrapper from './ModalWrapper.vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const userNote = reactive({
  title: props.note.title,
  body: props.note.body
})

const isFormInvalid = computed(() => {
  return userNote.title === '' || userNote.body === ''
})

const btnDisable = computed(() =>
  isFormInvalid.value
    ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
)

const update = async () => {
  useNotesStore().updateNotes(props.note.id, userNote)
  document.getElementById(`close-modal${props.note.id}`).click()

  // fix for dropdown unable to click in newly created notes
  await nextTick() // This ensures that the DOM is fully updated before calling initFlowbite
  initFlowbite() // re-initializes the Flowbite components
}
</script>

<template>
  <ModalWrapper :id="`edit-modal${note.id}`">
    <!-- Modal header -->
    <div
      class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Notes</h3>
      <button
        :id="`close-modal${note.id}`"
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
        :data-modal-toggle="`edit-modal${note.id}`"
      >
        <IconClose />
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <!-- Modal body -->
    <form class="p-4 md:p-5" @submit.prevent="update">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title
          </label>
          <input
            v-model="userNote.title"
            type="text"
            name="title"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type notes title"
            required
          />
        </div>

        <div class="col-span-2">
          <label for="notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Notes
          </label>
          <textarea
            v-model="userNote.body"
            id="notes"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your notes here"
          ></textarea>
        </div>
      </div>
      <button
        :disabled="isFormInvalid"
        :class="btnDisable"
        type="submit"
        class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <IconEdit class="me-1 -ms-1" />
        Update notes
      </button>
    </form>
  </ModalWrapper>
</template>
