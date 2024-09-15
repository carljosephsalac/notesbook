<script setup>
import { computed, reactive, nextTick } from 'vue'
import IconEdit from './icons/IconEdit.vue'
import { useNotesStore } from '@/stores/notes'
import { initFlowbite } from 'flowbite'
import ModalWrapper from './ModalWrapper.vue'
import ModalHeader from './ModalHeader.vue'
import BtnCloseModal from './BtnCloseModal.vue'
import MyLabel from './MyLabel.vue'
import InputModal from './InputModal.vue'
import TextareaModal from './TextareaModal.vue'
import BtnIconPrimary from './BtnIconPrimary.vue'

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
    <ModalHeader>
      Edit notes
      <template #close>
        <BtnCloseModal :id="`close-modal${note.id}`" :toggle="`edit-modal${note.id}`" />
      </template>
    </ModalHeader>

    <!-- Modal body -->
    <form class="p-4 md:p-5" @submit.prevent="update">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
          <MyLabel for-label="title">Title</MyLabel>
          <InputModal v-model="userNote.title" />
        </div>

        <div class="col-span-2">
          <MyLabel for-label="notes">Notes</MyLabel>
          <TextareaModal v-model="userNote.body" />
        </div>
      </div>
      <BtnIconPrimary :disabled="isFormInvalid">
        <IconEdit class="me-1 -ms-1" />
        Update notes
      </BtnIconPrimary>
    </form>
  </ModalWrapper>
</template>
