<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute();

const viewName = route.name;
const viewPath = route.path.substring(1);
const bgUrl = `../src/images/header-${viewPath}.png`;

const routeMatched = route.matched;
const viewDescription = routeMatched.find(r => r.name === route.name)?.props?.default?.description;

</script>

<template>
  <v-app-bar scroll-behavior="hide" :image="bgUrl" height="300">
    <div class="d-flex flex-column w-100">
      <div class="nav-container bg-white opacity-60 d-flex align-center w-100">
        <v-container>
          <v-row>
            <v-col cols="9">
              <nav class="nav-link-text">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/recipe-creator">Creador de Recetas</RouterLink>
              </nav>
            </v-col>
            <v-col cols="3">
              iconos
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="nav-info w-100">
        <v-container class="h-100 d-flex align-center justify-center">
          <v-row>
            <v-col>
              <h2 class="text-center">{{ viewName }}</h2>
              <h5 class="text-center">{{ viewDescription }}</h5>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
header>div.v-toolbar__content {
  align-items: flex-start;
}
.nav-container {
  height: 80px;
}
.nav-info{
  height: 220px;
}
</style>
