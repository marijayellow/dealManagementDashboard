<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import SearchInput from "../components/SearchInput.vue";
import TableFilters from "../components/TableFilters.vue";
import { useDealsStore } from "../stores/dealsStore";
import { useUserStore } from "../stores/userStore";

const store = useDealsStore();
const userStore = useUserStore();
const router = useRouter();

const search = ref("");
const selectedStatuses = ref([]);
const minAmount = ref(null);
const maxAmount = ref(null);

// FILTERs + SEARCH
const filteredDeals = computed(() => {
  const term = search.value.toLowerCase().trim();

  return store.deals.filter((deal) => {
    // Role-based check
    if (!userStore.canViewDeal(deal.id)) return false;

    // Search + filter logic
    const matchesSearch =
      deal.name.toLowerCase().includes(term) ||
      deal.account.toLowerCase().includes(term) ||
      deal.status.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatuses.value.length === 0 ||
      selectedStatuses.value.includes(deal.status);

    const matchesMin = !minAmount.value || deal.amount >= minAmount.value;
    const matchesMax = !maxAmount.value || deal.amount <= maxAmount.value;

    return matchesSearch && matchesStatus && matchesMin && matchesMax;
  });
});

function goToDeal(id) {
  router.push(`/deal/${id}`);
}

onMounted(() => {
  // caching check
  if (!store.deals.length) store.loadDeals();
  store.startPolling();
});

onUnmounted(() => {
  store.stopPolling();
});
function statusClass(status) {
  return {
    Open: "bg-gray-200 text-gray-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  }[status];
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6 mt-6">
    <div
      class="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-6 mt-6"
    >
      <!-- HEADER -->
      <h1
        class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 text-center"
      >
        {{ $t("dashboardTitle") }}
      </h1>

      <!-- SEARCH + FILTERS -->
      <div class="flex flex-col items-center gap-4 mb-6">
        <SearchInput v-model="search" />

        <TableFilters
          :selectedStatuses="selectedStatuses"
          :minAmount="minAmount"
          :maxAmount="maxAmount"
          @update:selectedStatuses="selectedStatuses = $event"
          @update:minAmount="minAmount = $event"
          @update:maxAmount="maxAmount = $event"
        />
      </div>

      <!-- ERROR -->
      <div v-if="store.error" class="text-red-500 text-center">
        {{ store.error }}

        <button @click="store.loadDeals" class="ml-2 underline">
          {{ $t("retry") }}
        </button>
      </div>

      <!-- TABLE / LIST -->
      <div class="overflow-x-auto">
        <table class="w-full border border-gray-200 rounded-lg">
          <!-- HEADER (hidden on mobile) -->
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
              v-for="deal in filteredDeals"
              :key="deal.id"
              @click="goToDeal(deal.id)"
              class="block md:table-row border mb-4 md:mb-0 rounded-lg md:rounded-none shadow md:shadow-none hover:bg-gray-50 cursor-pointer transition"
            >
              <!-- NAME -->
              <td class="p-3 block md:table-cell text-left md:text-center">
                <span class="md:hidden font-semibold block mb-1">
                  {{ $t("description") }}
                </span>
                <span class="font-medium text-gray-800">
                  {{ deal.name }}
                </span>
              </td>

              <!-- ACCOUNT -->
              <td class="p-3 block md:table-cell text-left md:text-center">
                <span class="md:hidden font-semibold block mb-1">
                  {{ $t("account") }}
                </span>
                {{ deal.account }}
              </td>

              <!-- STATUS -->
              <td class="p-3 block md:table-cell text-left md:text-center">
                <span class="md:hidden font-semibold block mb-1">
                  {{ $t("status") }}
                </span>

                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="statusClass(deal.status)"
                >
                  {{ deal.status }}
                </span>
              </td>

              <!-- AMOUNT -->
              <td class="p-3 block md:table-cell text-left md:text-center">
                <span class="md:hidden font-semibold block mb-1">
                  {{ $t("amount") }}
                </span>
                ${{ deal.amount }}
              </td>

              <!-- CREATED -->
              <td class="p-3 block md:table-cell text-left md:text-center">
                <span class="md:hidden font-semibold block mb-1">
                  {{ $t("created") }}
                </span>
                {{ deal.createdAt }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EMPTY -->
      <p
        v-if="filteredDeals.length === 0"
        class="text-gray-500 mt-4 text-center"
      >
        {{ $t("noResults") }}
      </p>

      <!-- LOAD MORE -->
      <div v-if="store.hasMore" class="mt-6 flex justify-center">
        <button
          @click="store.loadNextPage()"
          class="w-full md:w-auto bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
          :disabled="store.loading"
        >
          {{ store.loading ? $t("loading") : $t("loadMore") }}
        </button>
      </div>
    </div>
  </div>
</template>
