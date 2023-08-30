<template>
  <div class="catalog">
    <div class="catalog-container">
      <div class="catalog-filters">Filters</div>
      <div class="catalog-products">
        <div class="catalog-header">
          <h2>This is a catalog</h2>
          <button class="catalog-header__button">
            <div>Sort by higher price</div>
            <span>v</span>
          </button>
        </div>
        <div>
          <div class="product-card-container" v-if="loading">
            <ProductCard
              v-for="game in games || []"
              :key="game.id"
              :product="game"
              imageClass="image-mode"
              class="product-card"
            />
          </div>
          <base-spinner title="loading" v-else class="spinner-style"></base-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ProductItem } from '@/types/interfaces/productItem';
import ProductCard from '@/components/ProductCard.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);

    onMounted(async () => {
      await store.dispatch('fetchProducts');
      loading.value = true;
    });

    return {
      loading,
    };
  },
  computed: {
    games(): ProductItem[] {
      const fetchedGames = this.$store.state.products.products || [];

      return this.shuffleArray(fetchedGames);
    },
  },
  methods: {
    shuffleArray(array: ProductItem[]): ProductItem[] {
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
  display: flex;

  .spinner-style {
    height: 50px;
    margin: 100px;
    transition: opacity 0.3s ease;
  }

  .catalog-container {
    display: flex;

    .catalog-filters {
      min-width: 20vw;
    }

    .catalog-products {
      display: flex;
      max-width: 60vw;
      flex-direction: column;

      .catalog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          color: white;
          margin-bottom: 45px;
          font-family: 'Roboto', sans-serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 47px;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
        }

        .catalog-header__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          height: 53px;
          border-radius: 10px;
          background-color: rgba(27, 23, 41, 1);
          color: rgba(255, 255, 255, 1);
          font-size: 15px;
          font-weight: 400;
          line-height: 19px;
          letter-spacing: 0em;
          padding: 25px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          span {
            color: rgba(119, 190, 29, 1);
          }
        }
      }

      .product-card-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: auto;
        margin-top: 45px;

        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: scale(1.07);
            box-shadow: 0px 8px 12px rgba(200, 200, 200, 0.4);
          }
        }
      }
    }
  }
}

@media (max-width: 380px) {
  h2 {
    text-align: center;
  }
}
</style>
