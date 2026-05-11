<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { getDealById } from "../services/dealService";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const deal = ref(null);
const loading = ref(true);
const error = ref(null);

const dealId = route.params.id;

// Load deal
async function loadDeal() {
  loading.value = true;
  error.value = null;
  deal.value = null;

  try {
    const found = await getDealById(dealId);

    if (!userStore.canViewDeal(found.id)) {
      error.value = "noAccess";
      deal.value = null;
      return;
    }

    deal.value = found;
  } catch (e) {
    if (e.message?.toLowerCase().includes("not found")) {
      error.value = "notFound";
    } else {
      error.value = "error";
    }
  } finally {
    loading.value = false;
  }
}

onMounted(loadDeal);

watch(
  () => userStore.currentUserKey,
  async () => {
    await loadDeal();
  },
);

function goBack() {
  router.push("/");
}

function statusClass(status) {
  return {
    Open: "bg-gray-200 text-gray-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  }[status];
}

// USERS WITH ACCESS
const usersWithAccess = computed(() => {
  if (!deal.value) return [];

  return userStore.usersList.filter((user) =>
    userStore.canViewDealForUser(user, deal.value.id),
  );
});

// ROLE ICONS (NEW)
function roleIcon(role) {
  if (role === "Admin") return "👑";
  if (role === "Partner 1") return "👤";
  if (role === "Partner 2") return "👥";
  return "👤";
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 mt-6">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6">
      <!-- BACK -->
      <button @click="goBack" class="mb-6 text-blue-600 hover:underline">
        {{ $t("back") }}
      </button>

      <!-- LOADING -->
      <div v-if="loading" class="text-gray-500 text-center">
        {{ $t("loading") }}
      </div>

      <!-- ERRORS -->
      <div v-else-if="error === 'notFound'" class="text-red-500 text-center">
        {{ $t("noResults") }}
      </div>

      <div v-else-if="error === 'noAccess'" class="text-red-500 text-center">
        You do not have access to this deal.
      </div>

      <div v-else-if="error === 'error'" class="text-red-500 text-center">
        Something went wrong.
      </div>

      <!-- CONTENT -->
      <div v-else>
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">
            {{ deal.name }}
          </h1>

          <span
            class="px-3 py-1 text-sm rounded-full"
            :class="statusClass(deal.status)"
          >
            {{ $t(deal.status.toLowerCase()) }}
          </span>
        </div>

        <!-- INFO GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("account") }}</p>
            <p class="font-medium">{{ deal.account }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("amount") }}</p>
            <p class="font-medium">${{ deal.amount }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("created") }}</p>
            <p class="font-medium">{{ deal.createdAt }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("updated") }}</p>
            <p class="font-medium">{{ deal.updatedAt }}</p>
          </div>
        </div>

        <!-- ACCESS INFO -->
        <div class="mt-6 bg-blue-50 p-4 rounded-lg">
          <p class="text-blue-700 font-medium mb-3">Access Information</p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="user in usersWithAccess"
              :key="user.key"
              class="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-1"
            >
              <span class="text-xs">
                {{ roleIcon(user.role) }}
              </span>

              {{ user.role }}
            </span>
          </div>
        </div>

        <!-- DESCRIPTION -->
        <div v-if="deal.description" class="mt-6 bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-500 mb-1">
            {{ $t("description") }}
          </p>

          <p class="text-gray-800 leading-relaxed">
            {{ deal.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
