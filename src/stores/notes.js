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
      const maxId = this.notes.reduce((max, note) => Math.max(max, parseInt(note.id)), 0)
      const newNote = {
        id: String(maxId + 1),
        title: note.title,
        body: note.body,
        author: 'Carl Joseph',
        created_at: new Date().toLocaleDateString('en-US', {
          month: 'long', // Full month name (e.g., September)
          day: 'numeric', // Numeric day (e.g., 9)
          year: 'numeric' // Full year (e.g., 2024)
        }),
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
    },
    saveNotes(id) {
      const note = this.notes.find((n) => n.id === id)
      note.is_saved = !note.is_saved

      fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ is_saved: note.is_saved })
      }).catch((err) => console.log(err))
    },
    trashNotes(id) {
      const note = this.notes.find((n) => n.id === id)
      note.is_trash = !note.is_trash

      fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ is_trash: note.is_trash })
      }).catch((err) => console.log(err))
    },
    deleteNotes(id) {
      this.notes = this.notes.filter((note) => note.id !== id)

      fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE'
      }).catch((err) => console.log(err))
    }
  }
})
