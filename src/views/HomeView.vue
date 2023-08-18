<template>
  <div>
    <div class="home">
      <the-carousel>
        <template v-slot:default>
          <div>CONTENTS FOR TheSlides</div>
        </template>
      </the-carousel>
      <h2 id="reviews">Reviews</h2>
      <h2 id="promotions">Promotions</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCarousel from '@/components/TheCarousel.vue';

export default defineComponent({
  components: {
    TheCarousel: TheCarousel,
  },
});
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
</style>
