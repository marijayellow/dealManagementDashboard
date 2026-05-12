<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

import { useRouter } from "vue-router";

import SearchInput from "../components/SearchInput.vue";
import TableFilters from "../components/TableFilters.vue";
import DealTable from "../components/DealTable.vue";

import { useDealsStore } from "../stores/dealsStore";
import { useUserStore } from "../stores/userStore";

const store = useDealsStore();
const userStore = useUserStore();

const router = useRouter();

const pollingInterval = ref(null);

const search = ref("");
const selectedStatuses = ref([]);

const minAmount = ref(null);
const maxAmount = ref(null);

// PAGINATION
const currentPage = ref(1);
const pageSize = 7;

// FETCH DEALS
async function fetchFilteredDeals(silent = false) {
  await store.loadDeals(
    {
      user: userStore.currentUser,

      search: search.value,

      statuses: selectedStatuses.value,

      minAmount: minAmount.value,
      maxAmount: maxAmount.value,
    },
    silent,
  );
}

// INITIAL LOAD
onMounted(async () => {
  await fetchFilteredDeals();

  // polling
  pollingInterval.value = setInterval(() => {
    fetchFilteredDeals(true);
  }, 5000);
});

// CLEANUP
onUnmounted(() => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
});

// REFETCH ON FILTER / SEARCH / USER CHANGE
watch(
  [
    search,
    selectedStatuses,
    minAmount,
    maxAmount,
    () => userStore.currentUserKey,
  ],
  async () => {
    currentPage.value = 1;

    await fetchFilteredDeals();
  },
  { deep: true },
);

// PAGINATED DEALS
const paginatedDeals = computed(() => {
  const start = (currentPage.value - 1) * pageSize;

  const end = start + pageSize;

  return store.deals.slice(start, end);
});

// TOTAL PAGES
const totalPages = computed(() => {
  return Math.ceil(store.total / pageSize);
});

// PAGE NUMBERS
const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

// PAGE CHANGE
function changePage(page) {
  currentPage.value = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// OPEN DEAL DETAILS
function goToDeal(id) {
  router.push(`/deal/${id}`);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6 mt-6">
    <div
      class="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-6 mt-6"
    >
      <!-- HEADER -->
      <h1 class="text-2xl md:text-3xl font-semibold mb-1 text-gray-800">
        {{ $t("dashboardTitle") }}
      </h1>

      <p class="text-sm text-gray-500 mb-4">
        {{ $t("dashboardSubtitle") }}
      </p>

      <!-- SEARCH + FILTERS -->
      <div class="flex flex-col gap-3 mb-4 w-full">
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

      <!-- LOADING -->
      <div
        v-if="store.loading && !store.deals.length"
        class="py-4 text-center text-gray-500"
      >
        {{ $t("loading") }}
      </div>

      <!-- ERROR -->
      <div v-else-if="store.error" class="text-red-500 text-center mb-4">
        {{ store.error }}

        <button @click="fetchFilteredDeals" class="ml-2 underline">
          {{ $t("retry") }}
        </button>
      </div>

      <!-- DEAL TABLE -->
      <DealTable v-else :deals="paginatedDeals" @rowClick="goToDeal" />

      <!-- PAGINATION -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-end">
        <div class="flex items-center gap-2 flex-wrap">
          <button
            v-for="page in pages"
            :key="page"
            @click="changePage(page)"
            :class="[
              'min-w-[40px] h-10 px-3 rounded-xl text-sm font-medium transition',
              currentPage === page
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
