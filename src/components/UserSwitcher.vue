<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const { t } = useI18n();

const isOpen = ref(false);


const users = [
  { labelKey: "admin" },
  { labelKey: "partner1" },
  { labelKey: "partner2" },
];

// Restore saved user
onMounted(() => {
  const savedUser = sessionStorage.getItem("userRole");

  if (savedUser) {
    userStore.switchUser(savedUser);
  }
});

// User keys for lookup
const userKeys = ["admin", "partner1", "partner2"];

// Change user
function changeUser(index) {
  const userKey = userKeys[index];
  userStore.switchUser(userKey);
  sessionStorage.setItem("userRole", userKey);
  isOpen.value = false;
}

// Button styles
const buttonClass = (index) =>
  userStore.currentUserKey === userKeys[index]
    ? "bg-blue-100 text-blue-800 font-semibold"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
</script>

<template>
  <div class="relative">
    <!-- DESKTOP -->
    <div class="hidden md:flex items-center gap-2">
      <button
        v-for="(user, index) in users"
        :key="index"
        @click="changeUser(index)"
        :class="[
          'flex items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm',
          buttonClass(index),
        ]"
      >
        <span>{{ t(user.labelKey) }}</span>
      </button>
    </div>

    <!-- MOBILE -->
    <div class="md:hidden">
      <!-- Hamburger -->
      <button
        @click="isOpen = !isOpen"
        class="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition"
      >
        ☰
      </button>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border p-2 z-50"
      >
        <button
          v-for="(user, index) in users"
          :key="index"
          @click="changeUser(index)"
          :class="[
            'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors mb-1',
            buttonClass(index),
          ]"
        >
          <span>{{ t(user.labelKey) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
