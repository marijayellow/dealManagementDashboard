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
    class="flex flex-col md:flex-row md:flex-wrap gap-4 mb-4 w-full items-start md:items-center justify-center"
  >
    <!-- STATUS FILTER -->
    <div
      class="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto"
    >
      <strong class="mb-1 md:mb-0">{{ $t("status") }}</strong>

      <div class="flex flex-col md:flex-row gap-2">
        <label class="flex items-center gap-1">
          <input
            type="checkbox"
            value="Open"
            v-model="localStatuses"
            class="accent-blue-500"
          />
          Open
        </label>

        <label class="flex items-center gap-1">
          <input
            type="checkbox"
            value="Approved"
            v-model="localStatuses"
            class="accent-green-500"
          />
          Approved
        </label>

        <label class="flex items-center gap-1">
          <input
            type="checkbox"
            value="Rejected"
            v-model="localStatuses"
            class="accent-red-500"
          />
          Rejected
        </label>
      </div>
    </div>

    <!-- AMOUNT FILTER -->
    <div
      class="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto"
    >
      <strong class="mb-1 md:mb-0">{{ $t("amount") }}</strong>

      <div class="flex gap-2">
        <input
          type="number"
          v-model="localMin"
          placeholder="Min"
          class="border rounded px-2 py-1 w-full md:w-20 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          type="number"
          v-model="localMax"
          placeholder="Max"
          class="border rounded px-2 py-1 w-full md:w-20 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- CLEAR BUTTON -->
    <div class="w-full md:w-auto">
      <button
        @click="clearFilters"
        class="w-full md:w-auto bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
      >
        {{ $t("clearFilters") }}
      </button>
    </div>
  </div>
</template>
