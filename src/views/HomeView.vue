<template>
  <div class="home">
    <h2 id="reviews">Reviews</h2>
    <h2 id="promotions">Promotions</h2>
    <carousel :items-to-show="1.5" :autoplay="1000" :wrapAround="true">
      <slide v-for="slide in 10" :key="slide">
        {{ slide }}
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
</script>

<style lang="scss"></style>
