<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted, computed, reactive } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NotesItem from '@/components/NotesItem.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()

// Ensure deep copy with reactivity
const savedCopy = computed(() => {
  return notesStore.notes
    .filter((note) => note.is_saved)
    .map((s) => reactive(JSON.parse(JSON.stringify(s))))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

savedCopy.value.forEach((s) => (s.is_expanded = false))
</script>

<template>
  <main class="flex flex-col items-center flex-grow h-auto pt-16 pb-5 bg-gray-100">
    <div class="flex flex-col w-full max-w-3xl gap-4 mt-2">
      <div v-for="note in savedCopy" :key="note.id">
        <NotesItem :note="note" />
      </div>
    </div>
  </main>
</template>
