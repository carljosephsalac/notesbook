<template>
  <div class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
      <slot></slot>
    </h3>
    <slot name="close"></slot>
  </div>
</template>
