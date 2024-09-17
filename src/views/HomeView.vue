<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import CreateNotes from '@/components/CreateNotes.vue'
import NotesItem from '@/components/NotesItem.vue'
import ViewWrapper from '@/components/ViewWrapper.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()
</script>

<template>
  <ViewWrapper>
    <CreateNotes />
    <div v-for="note in notesStore.sorted" :key="note.id">
      <NotesItem :note="note" />
    </div>
  </ViewWrapper>
</template>
