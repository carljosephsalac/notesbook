<script setup>
import DropDown from '@/components/DropDown.vue'
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const nl2br = (text) => {
  return text.replace(/\n/g, '<br>')
}

const e = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  // this will traverse the text only once and it will find the character that matches within [&<>"']
  // (m) is the matched character
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// simple version of e()
/* const e = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
} */

const truncateText = (text, length) => {
  // finds the index of last space in text within a given length
  const sliceIndex = text.lastIndexOf(' ', length)

  // If no space is found before length, it slices the text exactly at the length position.
  // This ensures that even if there is no space, the text is cut to the desired length.
  // If a space is found, it slices the text at the nearest space
  return sliceIndex === -1 ? text.slice(0, length) : text.slice(0, sliceIndex) + '... '
}

// truncate text using lastIndexOf() and slice() simplified example
/* const sampleTruncate = () => {
  const name = 'carl joseph'
  const spaceIndex = name.lastIndexOf(' ', 10)
  return name.slice(0, spaceIndex) + '...'
}
console.log(sampleTruncate())
*/

const note = props.note

// logic for getting the note body
const getBody = () => {
  if (note.body.length > 400) {
    return note.is_expanded ? nl2br(e(note.body)) : nl2br(e(truncateText(note.body, 400)))
  } else {
    return nl2br(e(note.body))
  }
}

const isExpanded = computed(() => {
  return note.is_expanded ? 'block ms-1 mt-1' : 'inline ms-1 mt-1'
})

const longNote = () => note.body.length > 400

// Ref to store the note's DOM element
const noteRef = ref(null)

const toggleNote = async () => {
  // Ensure noteRef is set before proceeding
  if (noteRef.value) {
    const currentScrollPos = window.scrollY

    if (note.is_expanded) {
      // Save the height of the note before collapsing
      const previousHeight = noteRef.value.clientHeight

      // Toggle the note's expansion
      note.is_expanded = !note.is_expanded

      // Wait for DOM updates
      await nextTick()

      // Calculate the height difference after collapsing
      const newHeight = noteRef.value.clientHeight
      const heightDifference = previousHeight - newHeight

      // Adjust the scroll position to maintain the view
      window.scrollTo({ top: currentScrollPos - heightDifference })
    } else {
      // Expand the note without scroll adjustment
      note.is_expanded = !note.is_expanded

      // Smooth scroll to keep position after expanding
      window.scrollTo({ top: currentScrollPos })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md h-fit" ref="noteRef">
    <div class="flex justify-between">
      <div class="flex">
        <img class="rounded-full size-10 me-2" src="../assets/profile.jpg" alt="user photo" />
        <div class="leading-5">
          <p class="font-semibold font">{{ note.author }}</p>
          <small class="text-gray-600">{{ note.created_at }}</small>
        </div>
      </div>
      <DropDown :note="note" />
      <!-- <ModalEdit /> -->
    </div>

    <p class="font-semibold leading-5">{{ note.title }}</p>

    <div class="p-2 border border-gray-300 rounded-xl">
      <span v-html="getBody()"></span>
      <div v-if="longNote()" :class="isExpanded">
        <span @click="toggleNote()" class="font-semibold hover:underline hover:cursor-pointer">
          {{ !note.is_expanded ? 'See more' : 'See less' }}
        </span>
      </div>
    </div>
  </div>
</template>
