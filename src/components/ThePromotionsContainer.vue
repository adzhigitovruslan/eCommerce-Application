<template>
  <div class="promotions-container">
    <h2>Promotions<span>%</span></h2>
    <div class="promotions-list">
      <ProductCard v-for="(game, index) in discountedGames" :key="index" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import gamesData from '@/data.json';
import { defineComponent } from 'vue';
import { Game } from '@/components/game';
import ProductCard from '@/components/ProductCard.vue';

export default defineComponent({
  components: {
    ProductCard,
  },
  data() {
    return {
      games: (gamesData as { Games: Game[] }).Games,
    };
  },
  computed: {
    discountedGames(): Game[] {
      const discountedGames = this.games.filter((game: Game) => game.discount > 0);

      const shuffledGames = discountedGames.slice();

      for (let i = shuffledGames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledGames[i], shuffledGames[j]] = [shuffledGames[j], shuffledGames[i]];
      }

      return shuffledGames.slice(0, 4);
    },
  },
});
</script>

<style scoped lang="scss">
h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;

  span {
    color: #77be1d;
    margin-left: 10px;
  }
}
.promotions-container {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;

  .promotions-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;

    .promotion-card {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: left;
      max-width: 620px;
      height: 464px;

      .game-image {
        object-fit: cover;
        max-width: 620px;
        width: 550px;
        height: 319px;
        border-radius: 15px;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px;

    .promotions-list {
      justify-content: center;

      .promotion-card {
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>
