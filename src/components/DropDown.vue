<script setup>
import IconDots from '@/components/icons/IconDots.vue'
import IconSavedSolid from '@/components/icons/IconSavedSolid.vue'
import IconTrashSolid from '@/components/icons/IconTrashSolid.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    :id="`dropdownMenuIconButton${id}`"
    :data-dropdown-toggle="`dropdownDots${id}`"
    class="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
  >
    <IconDots />
    <!-- Dropdown menu -->
    <div
      :id="`dropdownDots${id}`"
      class="z-10 hidden w-48 px-2 bg-white divide-y divide-gray-300 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        :aria-labelledby="`dropdownMenuIconButton${id}`"
      >
        <li>
          <a
            href="#"
            class="flex items-center gap-2 px-2 py-2 text-base font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconSavedSolid class="text-gray-800 size-5" />
            Save notes
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center gap-2 px-2 py-2 text-base font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IconTrashSolid class="text-gray-800 size-5" />
            Move to trash
          </a>
        </li>
      </ul>
      <div class="py-2">
        <a
          data-modal-target="edit-modal"
          data-modal-toggle="edit-modal"
          class="flex items-center gap-2 px-2 py-2 text-base font-semibold text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          <IconEdit class="text-gray-800" />
          Edit notes
        </a>
      </div>
    </div>
  </div>
</template>
