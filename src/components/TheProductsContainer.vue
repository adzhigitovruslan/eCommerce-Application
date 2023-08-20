<template>
  <div class="products-container">
    <div v-for="(row, index) in rows" :key="index" class="product-row">
      <div v-for="game in row" :key="game.key">
        <ProductCard :game="game" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gamesData from '@/data.json';
import { Game } from '@/components/game';
import ProductCard from '@/components/ProductCard.vue';
import { defineComponent } from 'vue';

const formattedGames: Game[] = gamesData.Games.map((data: any) => {
  return {
    key: data.key,
    name: data.name,
    productType: data.productType,
    slug: data.slug,
    price: data.price,
    discount: data.discount,
    description: data.description,
    categories: data.categories,
    platform: data.platform,
    'activation region': data['activation region'],
    'system requirements': data['system requirements'],
    image: data.image,
  };
});

export default defineComponent({
  components: {
    ProductCard,
  },
  computed: {
    rows(): Game[][] {
      const games = this.shuffleArray(formattedGames); // Вызываем функцию shuffleArray
      const rows: Game[][] = [];

      for (let i = 0; i < games.length; i += 4) {
        rows.push(games.slice(i, i + 4));
      }

      return rows;
    },
  },
  methods: {
    shuffleArray(array: Game[]): Game[] {
      // Определяем функцию shuffleArray
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
  width: 80vw;
  display: grid;
  gap: 20px;
  margin: auto;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
}

.promotion-card {
  width: 300px;
  height: 530px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .game-image {
    width: 300px;
    height: 400px;
    border-radius: 15px;
    margin-bottom: 10px;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
