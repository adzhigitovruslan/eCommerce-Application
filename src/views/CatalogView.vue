<template>
  <div class="catalog">
    <h2>This is a catalog</h2>
    <div class="catalog-container">
      <div class="catalog-filters">Filters</div>
      <div class="product-card-container">
        <ProductCard v-for="game in games || []" :key="game.id" :product="game" imageClass="image-mode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Game } from '@/types/interfaces/game';
import ProductCard from '@/components/ProductCard.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore();

    console.log(store);

    onMounted(() => {
      store.dispatch('fetchProducts');
    });
  },
  computed: {
    games(): Game[] {
      const fetchedGames = this.$store.state.products.products || [];

      const filteredGames = fetchedGames.filter(
        (game: Game) => game.productType.id === '80040722-52b8-4a44-a613-005b0b124877',
      );

      return this.shuffleArray(filteredGames);
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
.catalog {
  width: 80vw;
  margin: auto;

  h2 {
    color: white;
    margin-bottom: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 47px;
    letter-spacing: 0em;
    text-align: left;
  }

  .catalog-container {
    display: flex;

    .catalog-filters {
      max-width: 20vw;
    }

    .product-card-container {
      max-width: 60vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: auto;
      margin-top: 45px;
    }
  }
}

@media (max-width: 380px) {
  h2 {
    text-align: center;
  }
}
</style>
