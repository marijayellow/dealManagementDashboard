<script setup>
const props = defineProps({
  deals: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
  onRetry: { type: Function, default: () => {} },
});

const emit = defineEmits(["rowClick"]);
</script>

<template>
  <div class="overflow-x-auto">
    <!-- LOADING STATE -->
    <div v-if="loading" class="py-4 text-center text-gray-500">
      {{ $t("loading") }}
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="py-4 text-red-500 flex flex-col items-center gap-2"
    >
      <span>{{ error }}</span>
      <button
        @click="onRetry()"
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
      >
        {{ $t("retry") }}
      </button>
    </div>

    <!-- TABLE -->
    <table
      v-else
      class="min-w-full border border-gray-300 rounded-lg overflow-hidden"
    >
      <thead class="bg-gray-100 text-gray-600 text-sm">
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
          class="hover:bg-gray-50 cursor-pointer transition"
          @click="$emit('rowClick', deal.id)"
        >
          <td class="px-4 py-2">{{ deal.name }}</td>
          <td class="px-4 py-2">{{ deal.account }}</td>
          <td class="px-4 py-2">{{ deal.status }}</td>
          <td class="px-4 py-2">{{ deal.amount }}</td>
          <td class="px-4 py-2">{{ deal.createdAt }}</td>
        </tr>

        <!-- EMPTY STATE -->
        <tr v-if="!deals.length">
          <td colspan="5" class="px-4 py-4 text-center text-gray-500">
            {{ $t("noResults") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
