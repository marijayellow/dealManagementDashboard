<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDealsStore } from "../stores/dealsStore";
import { useUserStore } from "../stores/userStore";
import { getDealById } from "../services/dealService";

const route = useRoute();
const router = useRouter();

const store = useDealsStore();
const userStore = useUserStore();

const deal = ref(null);
const loading = ref(true);
const error = ref(null);

const dealId = route.params.id;

onMounted(async () => {
  try {
    // Fetch deal directly by ID using new endpoint
    const found = await getDealById(dealId);

    // Role check
    if (!userStore.canViewDeal(found.id)) {
      error.value = "noAccess";
      return;
    }

    deal.value = found;
  } catch (e) {
    if (e.message.includes("not found")) {
      error.value = "notFound";
    } else {
      error.value = "error";
    }
  } finally {
    loading.value = false;
  }
});

// Watch for role changes and re-check access
watch(() => userStore.role, async () => {
  if (deal.value) {
    // Re-check access when role changes
    if (!userStore.canViewDeal(deal.value.id)) {
      error.value = "noAccess";
    } else {
      error.value = null; // Clear access error if now has access
    }
  }
});

function goBack() {
  router.push("/");
}

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
  <div class="min-h-screen bg-gray-100 p-6 mt-6">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6">
      <!-- BACK BUTTON -->
      <button
        @click="goBack"
        class="mb-6 text-sm text-blue-600 hover:underline"
      >
        {{ $t("back") }}
      </button>

      <!-- LOADING -->
      <div v-if="loading" class="text-gray-500 text-center">
        {{ $t("loading") }}
      </div>

      <!-- ERROR STATES -->
      <div v-else-if="error === 'notFound'" class="text-red-500 text-center">
        {{ $t("notResults") }}
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

          <!-- Role Tag -->
          <div class="flex items-center gap-2">
            <span
              class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
            >
              {{ userStore.role }}
            </span>
            
            <span
              class="px-3 py-1 text-sm rounded-full"
              :class="statusClass(deal.status)"
            >
              {{ $t(deal.status.toLowerCase()) }}
            </span>
          </div>
        </div>

        <!-- INFO GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("account") }}</p>
            <p class="font-medium text-gray-800">{{ deal.account }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("amount") }}</p>
            <p class="font-medium text-gray-800">${{ deal.amount }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("created") }}</p>
            <p class="font-medium text-gray-800">{{ deal.createdAt }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-500">{{ $t("updated") }}</p>
            <p class="font-medium text-gray-800">{{ deal.updatedAt }}</p>
          </div>
        </div>

        <!-- ACCESS INFO -->
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-blue-500 mb-1 font-medium">Access Information</p>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="text-gray-600 w-20">Current User:</span>
              <span class="font-medium">{{ userStore.role }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-20">Can View:</span>
              <span class="font-medium text-green-600">Yes</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-20">Visible To:</span>
              <span class="font-medium">
                <span v-if="userStore.role === 'Admin'" class="text-green-600">All Users</span>
                <span v-else class="text-blue-600">Admin + Partners (IDs: {{ userStore.assignedDealIds.join(', ') }})</span>
              </span>
            </div>
          </div>
        </div>

        <!-- DESCRIPTION -->
        <div v-if="deal.description" class="mt-6 bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-500 mb-1">{{ $t("description") }}</p>
          <p class="text-gray-800 leading-relaxed">
            {{ deal.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
