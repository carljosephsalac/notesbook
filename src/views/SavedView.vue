<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted, computed, reactive } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NotesItem from '@/components/NotesItem.vue'
import ViewWrapper from '@/components/ViewWrapper.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()

// notes deep copy with reactivity
const savedCopy = computed(() => {
  return notesStore.sorted
    .filter((note) => note.is_saved)
    .map((s) => reactive(JSON.parse(JSON.stringify(s))))
})

// collapse all saved notes in every visit to this view
savedCopy.value.forEach((s) => (s.is_expanded = false))
</script>

<template>
  <ViewWrapper>
    <div v-for="note in savedCopy" :key="note.id">
      <NotesItem :note="note" />
    </div>
  </ViewWrapper>
</template>
