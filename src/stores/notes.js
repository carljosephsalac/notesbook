import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes-store', {
  // Data
  state() {
    return {
      notes: []
    }
  },
  // Computed
  getters: {
    sorted: (state) => state.notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },
  // Method
  actions: {
    getNotes() {
      fetch('http://localhost:3000/notes')
        .then((res) => res.json())
        .then((data) => {
          this.notes = data
        })
        .catch((err) => console.log(err))
    },
    addNotes(note) {
      const newNote = {
        id: String(this.notes.length + 1),
        title: note.title,
        body: note.body,
        author: 'Carl Joseph',
        created_at: new Date().toLocaleDateString('en-US', {
          month: 'long', // Full month name (e.g., September)
          day: 'numeric', // Numeric day (e.g., 9)
          year: 'numeric' // Full year (e.g., 2024)
        }),
        is_expanded: false,
        is_saved: false,
        is_trash: false
      }

      this.notes.unshift(newNote)

      fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newNote)
      }).catch((err) => console.log(err))
    },
    updateNotes(id, editedNote) {
      const note = this.notes.find((n) => n.id === id)
      note.title = editedNote.title
      note.body = editedNote.body

      fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title: note.title,
          body: note.body
        })
      }).catch((err) => console.log(err))
    }
  }
})
