<script setup>
const props = defineProps({
  deals: Array,
});
const emit = defineEmits(["rowClick"]);

function statusClass(status) {
  return {
    Open: "bg-gray-200 text-gray-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  }[status];
}
</script>

<template>
  <div class="overflow-x-auto">
    <!-- Table -->
    <table v-if="deals.length" class="w-full border border-gray-200 rounded-lg">
      <thead
        class="hidden md:table-header-group bg-gray-50 text-sm text-gray-600"
      >
        <tr>
          <th class="p-3 text-center">📄 {{ $t("description") }}</th>
          <th class="p-3 text-center">🏢 {{ $t("account") }}</th>
          <th class="p-3 text-center">📊 {{ $t("status") }}</th>
          <th class="p-3 text-center">💰 {{ $t("amount") }}</th>
          <th class="p-3 text-center">📅 {{ $t("created") }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="deal in deals"
          :key="deal.id"
          @click="$emit('rowClick', deal.id)"
          class="block md:table-row border mb-4 md:mb-0 rounded-lg md:rounded-none shadow md:shadow-none hover:bg-gray-50 cursor-pointer transition"
        >
          <td class="p-3 block md:table-cell text-left md:text-center">
            <span class="md:hidden font-semibold block mb-1">{{
              $t("description")
            }}</span>
            <span class="font-medium text-gray-800">{{ deal.name }}</span>
          </td>

          <td class="p-3 block md:table-cell text-left md:text-center">
            <span class="md:hidden font-semibold block mb-1">{{
              $t("account")
            }}</span>
            {{ deal.account }}
          </td>

          <td class="p-3 block md:table-cell text-left md:text-center">
            <span class="md:hidden font-semibold block mb-1">{{
              $t("status")
            }}</span>
            <span
              class="px-2 py-1 text-xs rounded-full"
              :class="statusClass(deal.status)"
            >
              {{ deal.status }}
            </span>
          </td>

          <td class="p-3 block md:table-cell text-left md:text-center">
            <span class="md:hidden font-semibold block mb-1">{{
              $t("amount")
            }}</span>
            ${{ deal.amount }}
          </td>

          <td class="p-3 block md:table-cell text-left md:text-center">
            <span class="md:hidden font-semibold block mb-1">{{
              $t("created")
            }}</span>
            {{ deal.createdAt }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Results -->
    <p v-else class="text-gray-500 mt-4 text-center">
      {{ $t("noResults") }}
    </p>
  </div>
</template>
