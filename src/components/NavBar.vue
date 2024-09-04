<script setup>
import IconHome from './icons/IconHome.vue'
import IconSaved from './icons/IconSaved.vue'
import IconSearch from './icons/IconSearch.vue'
import IconTrash from './icons/IconTrash.vue'
import UserDropdown from './UserDropdown.vue'
import IconHomeSolid from './icons/IconHomeSolid.vue'
import IconSavedSolid from './icons/IconSavedSolid.vue'
import IconTrashSolid from './icons/IconTrashSolid.vue'
import NavLink from './NavLink.vue'
</script>

<template>
  <nav class="z-10 bg-white border-gray-200 shadow-md dark:bg-gray-900">
    <div class="relative flex items-center justify-between w-screen px-4 py-2">
      <div class="flex space-x-2">
        <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/notesbook-logo.png" class="h-10 rounded-full" alt="Notesbook Logo" />
        </RouterLink>
        <!-- Search button for md -->
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          class="lg:hidden hidden md:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
        >
          <IconSearch class="w-5 h-5" />
          <span class="sr-only">Search</span>
        </button>
        <!-- Search input for lg and up -->
        <div class="relative hidden lg:block">
          <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
            <IconSearch class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span class="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Notes"
          />
        </div>
      </div>

      <!-- Search input for xs to sm -->
      <div class="relative flex-grow w-auto mx-3 sm:mx-5 md:hidden">
        <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <IconSearch class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span class="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          class="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg sm:text-sm ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Notes"
        />
      </div>

      <div
        class="items-center justify-between hidden w-full md:-translate-x-1/2 md:transform md:absolute md:flex md:w-auto md:order-1 md:left-1/2"
        id="navbar-search"
      >
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto place-items-center">
          <NavLink
            to="/"
            route-name="home"
            tooltip-id="home"
            tooltip-text="Home"
            :icon="IconHome"
            :active-icon="IconHomeSolid"
          />

          <NavLink
            to="/saved"
            route-name="saved"
            tooltip-id="saved"
            tooltip-text="Saved"
            :icon="IconSaved"
            :active-icon="IconSavedSolid"
          />

          <NavLink
            to="/trash"
            route-name="trash"
            tooltip-id="trash"
            tooltip-text="Trash"
            :icon="IconTrash"
            :active-icon="IconTrashSolid"
          />
        </div>
      </div>

      <div class="flex md:order-3">
        <UserDropdown />
      </div>
    </div>
  </nav>
</template>
