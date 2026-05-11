<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import UserSwitcher from "./UserSwitcher.vue";
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center">
        <UserSwitcher />
      </div>

      <div class="flex items-center">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
