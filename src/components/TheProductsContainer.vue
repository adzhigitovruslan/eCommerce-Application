<template>
  <div class="products-container">
    <h2>Our Products</h2>
    <div v-for="(row, index) in rows" :key="index" class="product-row">
      <div v-for="game in row" :key="game.key">
        <ProductCard :game="game" imageClass="image-mode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gamesData from '@/data.json';
import { Game } from '@/types/interfaces/game';
import ProductCard from '@/components/ProductCard.vue';
import { defineComponent } from 'vue';

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
    rows(): Game[][] {
      const games = this.shuffleArray(this.games);
      const rows: Game[][] = [];

      const itemsPerRow = 4;
      const numRows = 3;

      for (let i = 0; i < numRows; i++) {
        const startIndex = i * itemsPerRow;
        const endIndex = (i + 1) * itemsPerRow;

        rows.push(games.slice(startIndex, endIndex));
      }

      return rows;
    },
  },
  methods: {
    shuffleArray(array: Game[]): Game[] {
      const shuffledArray = array.slice();

      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
    },
  },
});
</script>

<style scoped lang="scss">
.products-container {
  max-width: 80vw;
  display: grid;
  margin: auto;
  margin-top: 45px;
}

h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
  color: white;
  margin-bottom: 45px;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
  margin: auto;
  gap: 15px;
}

.promotion-card {
  height: 530px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
