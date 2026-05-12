import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchDeals } from "../services/dealService";

export const useDealsStore = defineStore("deals", () => {
  const deals = ref([]);
  const total = ref(0);

  const loading = ref(false);
  const error = ref(null);

  async function loadDeals(filters, silent = false) {
    if (!silent) loading.value = true;

    error.value = null;

    try {
      const res = await fetchDeals(filters);

      deals.value = res.data;
      total.value = res.total;
    } catch (e) {
      if (!silent) {
        error.value = e.message;
      }
    } finally {
      if (!silent) loading.value = false;
    }
  }

  return {
    deals,
    total,
    loading,
    error,
    loadDeals,
  };
});