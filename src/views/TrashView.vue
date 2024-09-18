<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted, computed, reactive } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NotesItem from '@/components/NotesItem.vue'
import ViewWrapper from '@/components/ViewWrapper.vue'
import DropDownTrash from '@/components/DropDownTrash.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()

// notes deep copy with reactivity
const trashCopy = computed(() => {
  return notesStore.sorted
    .filter((note) => note.is_trash)
    .map((s) => reactive(JSON.parse(JSON.stringify(s))))
})

// collapse all saved notes in every visit to this view
trashCopy.value.forEach((s) => (s.is_expanded = false))
</script>

<template>
  <ViewWrapper>
    <div v-for="note in trashCopy" :key="note.id">
      <NotesItem :note="note">
        <DropDownTrash :note="note" />
      </NotesItem>
    </div>
  </ViewWrapper>
</template>
