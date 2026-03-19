<script setup>
const props = defineProps({
  deals: Array,
  loading: Boolean,
  error: String,
  onRetry: Function,
});

const emit = defineEmits(["rowClick"]);
</script>

<template>
  <div class="overflow-x-auto">
    <div v-if="loading" class="py-4">{{ $t("loading") }}</div>
    <div v-else-if="error" class="py-4 text-red-500 flex flex-col gap-2">
      <span>{{ error }}</span>
      <button
        @click="onRetry()"
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-fit"
      >
        {{ $t("retry") }}
      </button>
    </div>
    <table v-else class="min-w-full border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">{{ $t("description") }}</th>
          <th class="px-4 py-2 text-left">{{ $t("account") }}</th>
          <th class="px-4 py-2 text-left">{{ $t("status") }}</th>
          <th class="px-4 py-2 text-left">{{ $t("amount") }}</th>
          <th class="px-4 py-2 text-left">{{ $t("created") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="deal in deals"
          :key="deal.id"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$emit('rowClick', deal.id)"
        >
          <td class="px-4 py-2">{{ deal.name }}</td>
          <td class="px-4 py-2">{{ deal.account }}</td>
          <td class="px-4 py-2">{{ deal.status }}</td>
          <td class="px-4 py-2">{{ deal.amount }}</td>
          <td class="px-4 py-2">{{ deal.createdAt }}</td>
        </tr>
        <tr v-if="deals.length === 0">
          <td colspan="5" class="px-4 py-2 text-center">
            {{ $t("noResults") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
