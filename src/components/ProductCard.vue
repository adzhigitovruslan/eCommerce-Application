<template>
  <div class="promotion-card" v-if="game">
    <img :src="getImagePath(game.image)" :alt="game.name" :class="imageClass" />
    <div class="game-info">
      <div class="game-price-container">
        <div class="game-price">Price: ${{ game.price }}</div>
        <div class="game-discount">{{ game.discount }}% off</div>
      </div>
      <div class="game-name">{{ game.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Game } from '@/components/game';

export default defineComponent({
  props: {
    game: Object as () => Game,
    imageClass: String,
  },

  computed: {
    getImagePath(): (image: string) => string {
      return (image: string) => require(`@/assets/images/${image}`);
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

.game-info {
  width: 265px;
  height: 113px;
  border-radius: 8px;

  .game-price {
    font-family: $manrope-font-family;
    color: $white-color;
    font-size: 24px;
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
  }

  .game-discount {
    width: 62px;
    border-radius: 8px;
    padding: 5px;
    font-family: $manrope-font-family;
    font-size: 14px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    background: rgba(119, 190, 29, 1);
    color: $white-color;
    text-align: center;
    margin: auto;
  }
}

.game-price-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-name {
  font-family: $roboto-font-family;
  color: $white-color;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}

.image-mode {
  max-width: 265px;
  height: 400px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}

.image-mode-promo {
  object-fit: cover;
  max-width: 620px;
  width: 550px;
  height: 319px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}

.top-four-image {
  max-width: 270px;
  height: 450px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}
</style>
