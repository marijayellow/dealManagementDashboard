<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import SearchInput from "../components/SearchInput.vue";
import TableFilters from "../components/TableFilters.vue";
import DealTable from "../components/DealTable.vue";
import { useDealsStore } from "../stores/dealsStore";
import { useUserStore } from "../stores/userStore";

const store = useDealsStore();
const userStore = useUserStore();
const router = useRouter();

const search = ref("");
const selectedStatuses = ref([]);
const minAmount = ref(null);
const maxAmount = ref(null);

// Filter and search
const filteredDeals = computed(() => {
  const term = search.value.toLowerCase().trim();

  return store.deals.filter((deal) => {
    if (!userStore.canViewDeal(deal.id)) return false;

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

// Polling + initial load
onMounted(() => {
  // Caching check
  if (!store.deals.length) store.loadDeals();

  if (store.startPolling) store.startPolling();
});

onUnmounted(() => {
  if (store.stopPolling) store.stopPolling();
});

// Status style
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
      <div
        class="flex flex-col md:flex-col md:justify-center items-center gap-4 mb-6 w-full"
      >
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

      <!-- INITIAL LOADING -->
      <div
        v-if="store.loading && store.deals.length === 0"
        class="py-4 text-center text-gray-500"
      >
        {{ $t("loading") }}
      </div>

      <!-- ERROR -->
      <div v-else-if="store.error" class="text-red-500 text-center mb-4">
        {{ store.error }}
        <button @click="store.loadDeals" class="ml-2 underline">
          {{ $t("retry") }}
        </button>
      </div>

      <!-- DEAL TABLE -->
      <DealTable v-else :deals="filteredDeals" @rowClick="goToDeal" />

      <!-- LOAD MORE BUTTON  -->
      <div
        v-if="store.hasMore && userStore.role === 'Admin'"
        class="mt-4 flex justify-center"
      >
        <button
          @click="store.loadNextPage()"
          class="w-full md:w-auto bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
          :disabled="store.loading"
        >
          {{ $t("loadMore") }}
        </button>
      </div>
    </div>
  </div>
</template>
