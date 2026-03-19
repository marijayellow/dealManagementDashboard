<script setup>
import { useI18n } from "vue-i18n";
import { onMounted, computed } from "vue";

import enFlag from "../assets/flags/en.svg";
import jaFlag from "../assets/flags/ja.svg";
import deFlag from "../assets/flags/de.svg";
import esFlag from "../assets/flags/es.svg";

const { locale } = useI18n();

const languages = [
  { code: "en", icon: enFlag, name: "English" },
  { code: "ja", icon: jaFlag, name: "日本語" },
  { code: "de", icon: deFlag, name: "Deutsch" },
  { code: "es", icon: esFlag, name: "Español" },
];

onMounted(() => {
  const saved = sessionStorage.getItem("locale");
  if (saved) locale.value = saved;
});

function changeLanguage(langCode) {
  locale.value = langCode;
  sessionStorage.setItem("locale", langCode);
}

// Classes for active and inactive buttons
const buttonClass = (langCode) =>
  locale.value === langCode
    ? "bg-blue-100 text-blue-800 font-semibold"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
</script>

<template>
  <div class="flex items-center gap-1 md:gap-2">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="changeLanguage(lang.code)"
      :class="[
        'flex items-center justify-center md:justify-start gap-1 px-2 md:px-3 py-1 rounded-lg transition-colors',
        buttonClass(lang.code),
      ]"
    >
      <img :src="lang.icon" class="w-5 h-4 md:w-6 md:h-4" alt="" />
      <span class="hidden md:inline text-sm">{{ lang.name }}</span>
    </button>
  </div>
</template>

<style scoped>
button {
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
