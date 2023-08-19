<template>
  <div>
    <div class="home">
      <the-carousel>
        <template v-slot:default>
          <div>CONTENTS FOR CAROUSEL</div>
        </template>
      </the-carousel>
      <h2 id="reviews"><the-reviews /></h2>
      <h2 id="promotions"><the-promotions /></h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheCarousel from '@/components/TheCarousel.vue';
import ThePromotions from '@/components/ThePromotionsContainer.vue';
import TheReviews from '@/components/TheReviewsContainer.vue';

export default defineComponent({
  components: {
    TheCarousel: TheCarousel,
    ThePromotions: ThePromotions,
    TheReviews: TheReviews,
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
