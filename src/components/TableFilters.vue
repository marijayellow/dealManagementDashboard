<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  selectedStatuses: Array,
  minAmount: Number,
  maxAmount: Number,
});

const emit = defineEmits([
  "update:selectedStatuses",
  "update:minAmount",
  "update:maxAmount",
]);

const localStatuses = ref([...props.selectedStatuses]);
const localMin = ref(props.minAmount);
const localMax = ref(props.maxAmount);

watch(localStatuses, (val) => emit("update:selectedStatuses", val));
watch(localMin, (val) => emit("update:minAmount", val));
watch(localMax, (val) => emit("update:maxAmount", val));

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
        <label>
          <input type="checkbox" value="Open" v-model="localStatuses" />
          Open
        </label>

        <label>
          <input type="checkbox" value="Approved" v-model="localStatuses" />
          Approved
        </label>

        <label>
          <input type="checkbox" value="Rejected" v-model="localStatuses" />
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
          class="border rounded px-2 py-1 w-full md:w-20"
        />

        <input
          type="number"
          v-model="localMax"
          placeholder="Max"
          class="border rounded px-2 py-1 w-full md:w-20"
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
