<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: true
  },
  tooltipId: {
    type: String,
    required: true
  },
  tooltipText: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  activeIcon: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const isActive = computed(() => route.name === props.routeName)
const btnHover = computed(() => (isActive.value ? '' : 'hover:bg-gray-200 dark:hover:bg-gray-800'))
</script>

<template>
  <RouterLink :to="to" class="flex items-center">
    <button
      :data-tooltip-target="tooltipId"
      type="button"
      class="relative inline-flex flex-col items-center justify-center py-2 rounded-lg md:px-12 group"
      :class="btnHover"
    >
      <component :is="activeIcon" v-if="isActive" />
      <div v-if="isActive" class="absolute w-24 h-1 bg-blue-600 -bottom-1"></div>
      <component :is="icon" v-else />
    </button>

    <div
      :id="tooltipId"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    >
      {{ tooltipText }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </RouterLink>
</template>
