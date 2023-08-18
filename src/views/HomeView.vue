<template>
  <div>
    <div class="home">
      <the-slides>
        <template v-slot:default>
          <div>CONTENTS FOR TheSlides</div>
        </template>
      </the-slides>
      <h2 id="reviews">Reviews</h2>
      <h2 id="promotions">Promotions</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheSlides from '../components/TheSlides.vue';

export default defineComponent({
  components: {
    TheSlides: TheSlides,
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
