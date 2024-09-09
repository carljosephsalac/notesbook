<script setup>
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import ModalCreate from '@/components/ModalCreate.vue'
import DropDown from '@/components/DropDown.vue'
import ModalEdit from '@/components/ModalEdit.vue'
import { useNotesStore } from '@/stores/notes'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const notesStore = useNotesStore()

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
const sample = () => {
  const name = 'carl joseph'
  const spaceIndex = name.lastIndexOf(' ', 10)
  return name.slice(0, spaceIndex) + '...'
}
console.log(sample())

// logic for getting the note body
const getBody = (body, expand) => {
  if (body.length > 400) {
    return expand ? nl2br(e(body)) : nl2br(e(truncateText(body, 400)))
  } else {
    return nl2br(e(body))
  }
}
</script>

<template>
  <main class="flex flex-col items-center flex-grow h-auto pt-16 pb-5 bg-gray-100">
    <div class="flex flex-col w-full max-w-3xl gap-4 mt-2">
      <div class="flex gap-3 p-4 bg-white rounded-lg shadow-md">
        <img class="rounded-full size-10" src="../assets/profile.jpg" alt="user photo" />
        <div
          class="flex-grow px-3 py-2 text-gray-600 bg-gray-100 rounded-full w-fit hover:cursor-pointer hover:bg-gray-200"
          data-modal-target="create-modal"
          data-modal-toggle="create-modal"
        >
          Create notes
        </div>
        <ModalCreate />
      </div>

      <div v-for="note in notesStore.sorted" :key="note.id">
        <div class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md h-fit">
          <div class="flex justify-between">
            <div class="flex">
              <img class="rounded-full size-10 me-2" src="../assets/profile.jpg" alt="user photo" />
              <div class="leading-5">
                <p class="font-semibold font">{{ note.author }}</p>
                <small class="text-gray-600">{{ note.created_at }}</small>
              </div>
            </div>
            <DropDown :id="note.id" />
            <ModalEdit />
          </div>

          <p class="font-semibold leading-5">{{ note.title }}</p>

          <div class="p-2 border border-gray-300 rounded-xl">
            <!-- <div v-if="note.body.length > 400">
              <div v-if="note.is_expanded" v-html="nl2br(e(note.body))"></div>
              <span v-else v-html="nl2br(e(truncateText(note.body, 400)))"></span>
              <span
                v-if="!note.is_expanded"
                @click="note.is_expanded = true"
                class="font-semibold hover:underline hover:cursor-pointer"
              >
                See more
              </span>
            </div>
            <div v-else v-html="nl2br(e(note.body))"></div> -->

            <span v-html="getBody(note.body, note.is_expanded)"></span>
            <span
              v-if="!note.is_expanded && note.body.length > 400"
              @click="note.is_expanded = true"
              class="font-semibold hover:underline hover:cursor-pointer"
            >
              See more
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
