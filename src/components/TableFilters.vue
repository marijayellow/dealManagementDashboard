<script setup>
import { ref, watch } from "vue";

// Props
const props = defineProps({
  selectedStatuses: Array,
  minAmount: Number,
  maxAmount: Number,
});

// Emits
const emit = defineEmits([
  "update:selectedStatuses",
  "update:minAmount",
  "update:maxAmount",
]);

// Local state
const localStatuses = ref([...props.selectedStatuses]);
const localMin = ref(props.minAmount ?? null);
const localMax = ref(props.maxAmount ?? null);

// Sync statuses
watch(localStatuses, (val) => {
  emit("update:selectedStatuses", val);
});

// FIX: always emit number or null (never string)
watch(localMin, (val) => {
  const parsed = val === "" ? null : Number(val);
  emit("update:minAmount", isNaN(parsed) ? null : parsed);
});

watch(localMax, (val) => {
  const parsed = val === "" ? null : Number(val);
  emit("update:maxAmount", isNaN(parsed) ? null : parsed);
});

// Clear filters
function clearFilters() {
  localStatuses.value = [];
  localMin.value = null;
  localMax.value = null;

  emit("update:selectedStatuses", []);
  emit("update:minAmount", null);
  emit("update:maxAmount", null);
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row md:flex-wrap gap-4 mb-4 w-full items-start md:items-center"
  >
    <!-- STATUS -->
    <div
      class="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto"
    >
      <strong class="mb-1 md:mb-0">{{ $t("status") }}</strong>

      <div class="flex flex-col md:flex-row gap-2">
        <!-- OPEN -->
        <label
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
        >
          <input
            type="checkbox"
            value="Open"
            v-model="localStatuses"
            class="w-4 h-4 border-gray-300 rounded"
          />
          {{ $t("open") }}
        </label>

        <!-- APPROVED -->
        <label
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer bg-green-50 text-green-700 hover:bg-green-100 transition"
        >
          <input
            type="checkbox"
            value="Approved"
            v-model="localStatuses"
            class="w-4 h-4 border-gray-300 rounded"
          />
          {{ $t("approved") }}
        </label>

        <!-- REJECTED -->
        <label
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 transition"
        >
          <input
            type="checkbox"
            value="Rejected"
            v-model="localStatuses"
            class="w-4 h-4 border-gray-300 rounded"
          />
          {{ $t("rejected") }}
        </label>
      </div>
    </div>

    <!-- AMOUNT -->
    <div
      class="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto"
    >
      <strong class="mb-1 md:mb-0">{{ $t("amount") }}</strong>

      <div class="flex gap-2">
        <input
          type="number"
          v-model="localMin"
          :placeholder="$t('min')"
          class="h-9 border rounded px-2 w-full md:w-20 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        <input
          type="number"
          v-model="localMax"
          :placeholder="$t('max')"
          class="h-9 border rounded px-2 w-full md:w-20 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- CLEAR -->
    <div class="w-full md:w-auto">
      <button
        @click="clearFilters"
        class="h-9 w-full md:w-auto bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        {{ $t("clearFilters") }}
      </button>
    </div>
  </div>
</template>
