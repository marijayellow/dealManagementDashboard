<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const isOpen = ref(false);

const users = [
  {
    key: "admin",
    label: "Admin",
    icon: "👑",
  },
  {
    key: "partner1",
    label: "Partner 1",
    icon: "👤",
  },
  {
    key: "partner2",
    label: "Partner 2",
    icon: "👥",
  },
];

// Restore saved user
onMounted(() => {
  const savedUser = sessionStorage.getItem("userRole");

  if (savedUser) {
    userStore.switchUser(savedUser);
  }
});

// Change user
function changeUser(userKey) {
  userStore.switchUser(userKey);

  sessionStorage.setItem("userRole", userKey);

  isOpen.value = false;
}

// Button styles
const buttonClass = (userKey) =>
  userStore.currentUserKey === userKey
    ? "bg-blue-100 text-blue-800 font-semibold"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
</script>

<template>
  <div class="relative">
    <!-- DESKTOP -->
    <div class="hidden md:flex items-center gap-2">
      <button
        v-for="user in users"
        :key="user.key"
        @click="changeUser(user.key)"
        :class="[
          'flex items-center gap-2 px-3 py-1 rounded-lg transition-colors text-sm',
          buttonClass(user.key),
        ]"
      >
        <span>{{ user.icon }}</span>
        <span>{{ user.label }}</span>
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
          v-for="user in users"
          :key="user.key"
          @click="changeUser(user.key)"
          :class="[
            'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors mb-1',
            buttonClass(user.key),
          ]"
        >
          <span>{{ user.icon }}</span>
          <span>{{ user.label }}</span>
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
