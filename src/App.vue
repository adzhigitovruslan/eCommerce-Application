<template>
  <TheNavigation />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="routeKey"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import TheNavigation from './components/TheNavigation.vue';

export default { components: { TheNavigation } };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';

const routeKey = ref('');

onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  routeKey.value = to.fullPath;
});
</script>

<style lang="scss">
#app {
  font-family: 'Manrope', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 100vh;
  background-color: #06030f;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #13101b;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
