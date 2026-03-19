<script setup>
import { ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue || "");
let timeout = null;

// Debounce emit
watch(internalValue, (val) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    emit("update:modelValue", val);
  }, 300);
});

// Cleanup timeout
onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout);
});

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val;
  },
);
</script>

<template>
  <input
    v-model="internalValue"
    type="text"
    :placeholder="$t('searchPlaceholder')"
    class="border rounded px-3 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</template>
