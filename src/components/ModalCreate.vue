<script setup>
import { computed, nextTick, reactive } from 'vue'
import { initFlowbite } from 'flowbite'
import { useNotesStore } from '@/stores/notes'
import IconAdd from './icons/IconAdd.vue'
import ModalWrapper from './ModalWrapper.vue'
import ModalHeader from './ModalHeader.vue'
import BtnCloseModal from './BtnCloseModal.vue'
import InputModal from './InputModal.vue'
import TextareaModal from './TextareaModal.vue'
import MyLabel from './MyLabel.vue'
import BtnIconPrimary from './BtnIconPrimary.vue'

const note = reactive({
  title: '',
  body: ''
})

const isFormInvalid = computed(() => {
  return note.title === '' || note.body === ''
})

const submit = async () => {
  useNotesStore().addNotes(note)
  document.getElementById('close-modal').click()

  note.title = ''
  note.body = ''

  // fix for dropdown unable to click in newly created notes
  await nextTick() // This ensures that the DOM is fully updated before calling initFlowbite
  initFlowbite() // re-initializes the Flowbite components
}
</script>

<template>
  <ModalWrapper id="create-modal">
    <ModalHeader>
      Create New Notes
      <template #close>
        <BtnCloseModal id="close-modal" toggle="create-modal" />
      </template>
    </ModalHeader>
    <!-- Modal body -->
    <form class="p-4 md:p-5" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
          <MyLabel for-label="title">Title</MyLabel>
          <InputModal v-model="note.title" />
        </div>

        <div class="col-span-2">
          <MyLabel for-label="notes">Notes</MyLabel>
          <TextareaModal v-model="note.body" />
        </div>
      </div>
      <BtnIconPrimary :disabled="isFormInvalid">
        <IconAdd />
        Add new notes
      </BtnIconPrimary>
    </form>
  </ModalWrapper>
</template>
