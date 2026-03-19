import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchDeals, mergeDeals } from "../services/dealService";

export const useDealsStore = defineStore("deals", () => {
  const deals = ref([]);
  const page = ref(1);
  const total = ref(0);
  const loading = ref(false);
  const error = ref(null);
  const limit = 5;
  let intervalId = null;

  const hasMore = computed(() => deals.value.length < total.value);

  // Fetch deals with optional silent mode
  async function loadDeals(silent = false) {
    if (!silent) loading.value = true;
    error.value = null;

    try {
      const res = await fetchDeals({ page: page.value, limit });
      deals.value = mergeDeals(deals.value, res.data);
      total.value = res.total;
    } catch (e) {
      if (!silent) error.value = e.message;
    } finally {
      if (!silent) loading.value = false;
    }
  }

  // Fetch next page
  function loadNextPage() {
    page.value++;
    loadDeals();
  }

  // Start automatic polling
  function startPolling() {
    if (intervalId) return;
    intervalId = setInterval(() => loadDeals(true), 5000); // silent refresh
  }

  // Stop polling
  function stopPolling() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return {
    deals,
    page,
    total,
    loading,
    error,
    hasMore,
    loadDeals,
    loadNextPage,
    startPolling,
    stopPolling,
  };
});
