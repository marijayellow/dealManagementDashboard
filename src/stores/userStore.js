import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // Current role
  const role = ref("Admin"); // "Admin" or "Partner"

  // partner assigned deals
  const assignedDealIds = ref([1, 3, 6]); // example

  function canViewDeal(dealId) {
    if (role.value === "Admin") return true;
    return assignedDealIds.value.includes(dealId);
  }

  return {
    role,
    assignedDealIds,
    canViewDeal,
  };
});
