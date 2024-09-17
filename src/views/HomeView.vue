<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import CreateNotes from '@/components/CreateNotes.vue'
import NotesItem from '@/components/NotesItem.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()
</script>

<template>
  <main class="flex flex-col items-center flex-grow h-auto pt-16 pb-5 bg-gray-100">
    <div class="flex flex-col w-full max-w-3xl gap-4 mt-2">
      <CreateNotes />

      <div v-for="note in notesStore.sorted" :key="note.id">
        <NotesItem :note="note" />
      </div>
    </div>
  </main>
</template>
