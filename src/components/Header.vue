<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

function switchRole() {
  userStore.role = userStore.role === 'Admin' ? 'Partner' : 'Admin';
}
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="font-semibold text-gray-700 text-sm md:text-base"></div>
      
      <div class="flex items-center gap-4">
        <!-- Role Switcher -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Role:</span>
          <button
            @click="switchRole"
            class="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {{ userStore.role }}
          </button>
          <span class="text-xs text-gray-500 ml-2">
            Switch role
          </span>
        </div>
        
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
