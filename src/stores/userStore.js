import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // Mock users
  const users = {
    admin: {
      role: "Admin",
      assignedDealIds: [],
    },

    partner1: {
      role: "Partner 1",
      assignedDealIds: [1, 2, 3, 7, 8, 10, 11, 12],
    },

    partner2: {
      role: "Partner 2",
      assignedDealIds: [3, 4, 5, 6],
    },
  };

  // Current user
  const currentUserKey = ref("admin");

  const currentUser = computed(() => users[currentUserKey.value]);

  // ALL USERS AS ARRAY (IMPORTANT FOR TAGS)
  const usersList = computed(() => {
    return Object.entries(users).map(([key, user]) => ({
      key,
      ...user,
    }));
  });

  // CHECK ACCESS FOR CURRENT USER
  function canViewDeal(dealId) {
    if (currentUser.value.role === "Admin") return true;

    return currentUser.value.assignedDealIds.includes(dealId);
  }

  // CHECK ACCESS FOR ANY USER
  function canViewDealForUser(user, dealId) {
    if (user.role === "Admin") return true;

    return user.assignedDealIds.includes(dealId);
  }

  function switchUser(userKey) {
    if (users[userKey]) {
      currentUserKey.value = userKey;
    }
  }

  return {
    users,
    usersList,
    currentUserKey,
    currentUser,
    canViewDeal,
    canViewDealForUser,
    switchUser,
  };
});
