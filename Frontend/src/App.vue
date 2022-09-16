<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade" mode="out-in">
      <div :key="route">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<style lang="css">
@import "../src/assets/styles/styles.css";
</style>
