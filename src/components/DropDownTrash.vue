<script setup>
import IconDots from '@/components/icons/IconDots.vue'
import IconTrashSolid from '@/components/icons/IconTrashSolid.vue'
import DropDownItem from './DropDownItem.vue'
import { useNotesStore } from '@/stores/notes'
import IconRestore from './icons/IconRestore.vue'
import ModalDelete from './ModalDelete.vue'

defineProps({
  note: {
    type: Object,
    required: true
  }
})

const noteStore = useNotesStore()
</script>

<template>
  <div
    :id="`dropdownMenuIconButton${note.id}`"
    :data-dropdown-toggle="`dropdownDots${note.id}`"
    class="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
  >
    <IconDots />
    <!-- Dropdown menu -->
    <div
      :id="`dropdownDots${note.id}`"
      class="z-10 hidden w-48 px-2 bg-white divide-y divide-gray-300 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        :aria-labelledby="`dropdownMenuIconButton${note.id}`"
      >
        <DropDownItem @click="noteStore.trashNotes(note.id)">
          <IconRestore />
          Restore notes
        </DropDownItem>
        <DropDownItem
          :data-modal-target="`popup-modal${note.id}`"
          :data-modal-toggle="`popup-modal${note.id}`"
        >
          <IconTrashSolid class="text-gray-800 size-5" />
          Delete forever
        </DropDownItem>
      </ul>
    </div>
  </div>
  <ModalDelete :id="note.id" />
</template>
