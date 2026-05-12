<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["change"]);
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center gap-2 mt-6 flex-wrap"
  >
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('change', page)"
      :class="[
        'h-9 min-w-[36px] px-3 rounded-lg text-sm transition',
        currentPage === page
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>
