<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import dealsData from "../mock/deals.json";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const deal = ref(null);
const loading = ref(true);

const dealId = route.params.id;

onMounted(() => {
  // find deal
  const found = dealsData.find((d) => String(d.id) === String(dealId));

  // no deal
  if (!found) {
    loading.value = false;
    return;
  }

  // check role
  if (!userStore.canViewDeal(found.id)) {
    alert("You do not have access to this deal.");
    router.push("/");
    return;
  }

  deal.value = found;
  loading.value = false;
});

function goBack() {
  router.push("/");
}

// STATUS STYLE
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
      <div v-if="loading" class="text-gray-500">{{ $t("loading") }}</div>

      <!-- NOT FOUND -->
      <div v-else-if="!deal" class="text-red-500">{{ $t("notResults") }}</div>

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
            {{ deal.status }}
          </span>
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
