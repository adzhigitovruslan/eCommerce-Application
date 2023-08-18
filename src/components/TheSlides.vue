<template>
  <Carousel :items-to-show="1.5" :items-to-scroll="1" :wrap-around="true" v-model:modelValue="currentSlide">
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item">
        <img :src="slide.imageUrl" :alt="'Slide ' + (index + 1)" class="custom-image" />
        <div
          class="overlay"
          :style="{ backgroundColor: index === currentSlide ? 'transparent' : 'rgba(6, 5, 12, 0.5)' }"
        ></div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import { ref, onMounted } from 'vue';

const slides = [
  { id: 1, imageUrl: require('../assets/minecraft/minecraft_6.jpeg') },
  { id: 2, imageUrl: require('../assets/minecraft/minecraft-4.jpeg') },
  { id: 3, imageUrl: require('../assets/images/minecraft2.jpeg') },
];

const currentSlide = ref(0);

onMounted(() => {
  currentSlide.value = Math.floor(slides.length / 2);
});
</script>

<style  lang="scss">
.carousel {
  margin-top: 35px;

  &__item {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 5%;
    object-fit: cover !important;
    transition: background-color 0.5s ease-in-out;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(6, 5, 12, 0.5);
      transition: background-color 0.5s ease-in-out;
    }
  }

  &__slide {
    padding: 10px;
    margin: 0px;
  }

  .custom-image {
    width: 100%;
    object-fit: cover !important;
    border-radius: 5%;
    background-color: rgba(6, 5, 12, 0.5);
  }

  &__prev,
  &__next {
    color: white;
    background: linear-gradient(0deg, rgba(196, 196, 196, 0.05), rgba(196, 196, 196, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    border: 1px solid #ffffff0d;
    border-radius: 50%;
    width: 50px;
    height: 50px;

    &:hover {
      color: #2c3e50;
    }
  }

  &__prev {
    left: 200px;
  }

  &__next {
    right: 200px;
  }

  &__pagination-item {
    width: 65px;
    color: white;
    margin: 0;
  }

  &__pagination-button {
    margin: 0;
    background: linear-gradient(0deg, rgba(196, 196, 196, 0.05), rgba(196, 196, 196, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
    padding: 1px;
    color: white;
    text-decoration: none;
    width: 65px;

    &:hover::after,
    &--active::after {
      background-color: white;
      width: 60px;
    }
  }
}

</style>
