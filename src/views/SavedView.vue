<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted, computed, reactive } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NotesItem from '@/components/NotesItem.vue'
import ViewWrapper from '@/components/ViewWrapper.vue'
import DropDown from '@/components/DropDown.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()

const savedCopy = computed(() => {
  return notesStore.sorted.filter((note) => note.is_saved && !note.is_trash)
})

// Local reactive copy of notes with `is_expanded` property
const localNotes = computed(() => {
  return savedCopy.value.map((note) =>
    reactive({
      ...note, // Copy all properties of `note`
      is_expanded: false // Add `is_expanded` property
    })
  )
})
</script>

<template>
  <ViewWrapper>
    <div v-for="note in savedCopy" :key="note.id">
      <NotesItem :note="note" :localNote="localNotes.find((n) => n.id === note.id)">
        <DropDown :note="note" />
      </NotesItem>
    </div>
  </ViewWrapper>
</template>
