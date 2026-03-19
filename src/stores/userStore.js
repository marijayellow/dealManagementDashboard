import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // Current user role: "Admin" or "Partner"
  const role = ref("Admin");

  // Partner's assigned deals (IDs)
  const assignedDealIds = ref([1, 2, 3]);

  // Check if user can view a deal
  function canViewDeal(dealId) {
    return role.value === "Admin" || assignedDealIds.value.includes(dealId);
  }

  return {
    role,
    assignedDealIds,
    canViewDeal,
  };
});
