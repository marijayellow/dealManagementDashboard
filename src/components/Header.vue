<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="font-semibold text-gray-700 text-sm md:text-base"></div>
      <LanguageSwitcher />
    </div>
  </header>
</template>
