<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const toggleMenuBtn = () => document.getElementById('user-menu-button').click()

const darkMode = () => {
  toggleMenuBtn()
  document.body.classList.add('dark')
}

const lightMode = () => {
  toggleMenuBtn()
  document.body.classList.remove('dark')
}
</script>

<template>
  <button
    type="button"
    class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    id="user-menu-button"
    aria-expanded="false"
    data-dropdown-toggle="user-dropdown"
    data-dropdown-placement="bottom"
  >
    <span class="sr-only">Open user menu</span>
    <img class="w-10 h-10 rounded-full" src="../assets/profile.jpg" alt="user photo" />
  </button>
  <!-- Dropdown menu -->
  <div
    class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    id="user-dropdown"
  >
    <div class="px-4 py-3">
      <span class="block text-sm text-gray-900 dark:text-white">Carl Joseph Salac</span>
      <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
        carl@notesbook.com
      </span>
    </div>
    <ul class="py-2" aria-labelledby="user-menu-button">
      <li class="md:hidden">
        <RouterLink
          to="/saved"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          :class="route.name === 'saved' ? 'bg-gray-100 dark:bg-gray-600' : ''"
          @click="toggleMenuBtn"
        >
          Saved
        </RouterLink>
      </li>
      <li class="md:hidden">
        <RouterLink
          to="/trash"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          :class="route.name === 'trash' ? 'bg-gray-100 dark:bg-gray-600' : ''"
          @click="toggleMenuBtn"
        >
          Trash
        </RouterLink>
      </li>
      <li>
        <a
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
          @click="darkMode"
        >
          Dark mode
        </a>
      </li>
      <li>
        <a
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer"
          @click="lightMode"
        >
          Light mode
        </a>
      </li>
    </ul>
  </div>
</template>
