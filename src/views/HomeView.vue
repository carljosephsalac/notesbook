<script setup>
import { initFlowbite } from 'flowbite'
import { computed, onMounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import CreateNotes from '@/components/CreateNotes.vue'
import NotesItem from '@/components/NotesItem.vue'
import ViewWrapper from '@/components/ViewWrapper.vue'
import DropDown from '@/components/DropDown.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

// const notesStore = useNotesStore()
const notes = computed(() => useNotesStore().sorted.filter((note) => !note.is_trash))
</script>

<template>
  <ViewWrapper>
    <CreateNotes />
    <div v-for="note in notes" :key="note.id">
      <NotesItem :note="note">
        <DropDown :note="note" />
      </NotesItem>
    </div>
  </ViewWrapper>
</template>
