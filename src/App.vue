<script setup>
import { RouterView } from 'vue-router'
// import HeaderNavigation from './components/HeaderNavigation.vue'
</script>

<template>
  <v-app>
    <!-- <HeaderNavigation></HeaderNavigation> -->
    <div class="separator-80"></div>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.separator-80{
  margin-bottom: 80px;
}
</style>
