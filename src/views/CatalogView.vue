<template>
  <div class="catalog">
    <div class="catalog-container">
      <div class="catalog-filters"><FilterBar /></div>

      <div class="catalog-products">
        <div class="catalog-header">
          <h2>This is a catalog</h2>
          <div class="sort-dropdown">
            <button class="catalog-header__button" @click="toggleDropdown">
              <div>{{ selectedOption }}</div>
              <span v-if="isDropdownOpen">▲</span>
              <span v-else>▼</span>
            </button>
            <ul v-show="isDropdownOpen" class="dropdown-list">
              <li @click="sortByHigherPrice">Sort by higher Price</li>
              <li @click="sortAZ">Sort A-Z</li>
              <li @click="sortZA">Sort Z-A</li>
              <li @click="sortByLowerPrice">Sort by lower Price</li>
            </ul>
          </div>
        </div>
        <div class="product-cards">
          <div class="product-card-container" v-if="loading">
            <template v-if="searchTerm && selectedProduct && Object.keys(selectedProduct).length > 0">
              <ProductCard
                :key="selectedProduct.key"
                :product="selectedProduct"
                imageClass="image-mode"
                class="product-card"
              />
            </template>

            <template v-else-if="searchTerm && !selectedProduct"> <div class="not-found">Not Found</div> </template>

            <template v-if="searchTerm.trim() === ''">
              <ProductCard
                v-for="product in allProducts || []"
                :key="product.key"
                :product="product"
                imageClass="image-mode"
                class="product-card"
              />
            </template>
          </div>
          <base-spinner title="loading" v-else class="spinner-style"></base-spinner>
          <div class="pagination-buttons_container">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="previous_button">
              Previous
            </button>
            <span class="current_page">{{ currentPage }}</span>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="next_button">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { ProductItem } from '@/types/interfaces/productItem';

const store = useStore();
const loading = ref(false);
const displayedGames = ref<ProductItem[]>([]);
const allProducts = ref<ProductItem[]>([]);
const currentPage = ref(1);
const itemsPerPage = 9;
let totalPages = 1;

const fetchProducts = async () => {
  const priceRange = store.state.products.priceRange;

  await store.dispatch('fetchProducts', priceRange);
  loading.value = true;
  displayedGames.value = store.state.products.products || [];
  allProducts.value = displayedGames.value;

  totalPages = Math.ceil(displayedGames.value.length / itemsPerPage);

  fetchDataForPage(currentPage.value);
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
    fetchDataForPage(page);
  }
};

const fetchDataForPage = (page: number) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  allProducts.value = displayedGames.value.slice(start, end);
};

watch(
  () => store.state.products.priceRange,
  (newPriceRange) => {
    store.dispatch('fetchProducts', newPriceRange);
  },
  { immediate: true },
);

watch(
  () => store.state.products.products,
  (newProducts) => {
    displayedGames.value = newProducts || [];

    totalPages = Math.ceil(newProducts.length / itemsPerPage);
  },
  { immediate: true },
);

watch(
  () => store.state.products.selectedCategories,
  (newSelectedCategories) => {
    store.dispatch('fetchProducts', newSelectedCategories);
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  fetchProducts();
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

import ProductCard from '@/components/ProductCard.vue';

import FilterBar from '@/components/FilterBar.vue';

export default defineComponent({
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: 'Sort by higher price',
    };
  },
  computed: {
    selectedProduct() {
      return this.$store.getters.selectedProduct;
    },
    searchTerm() {
      return this.$store.getters.getSearchTerm;
    },
  },
  components: {
    ProductCard,
    FilterBar,
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    sortByHigherPrice() {
      this.selectedOption = 'Sort by higher price';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const priceA = a.masterVariant.prices[0]?.value?.centAmount || 0;
        const priceB = b.masterVariant.prices[0]?.value?.centAmount || 0;

        return priceB - priceA;
      });

      this.$store.commit('setProducts', products);
    },
    sortAZ() {
      this.selectedOption = 'Sort A-Z';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const nameA = a.name['en-US'].toLowerCase();
        const nameB = b.name['en-US'].toLowerCase();

        return nameA.localeCompare(nameB);
      });
      this.$store.commit('setProducts', products);
    },
    sortZA() {
      this.selectedOption = 'Sort Z-A';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const nameA = a.name['en-US'].toLowerCase();
        const nameB = b.name['en-US'].toLowerCase();

        return nameB.localeCompare(nameA);
      });

      this.$store.commit('setProducts', products);
    },
    sortByLowerPrice() {
      this.selectedOption = 'Sort by lower price';

      const products = [...this.$store.state.products.products];

      products.sort((a, b) => {
        const priceA = a.masterVariant.prices[0]?.value?.centAmount || 0;
        const priceB = b.masterVariant.prices[0]?.value?.centAmount || 0;

        return priceA - priceB;
      });

      this.$store.commit('setProducts', products);
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';

body {
  overflow-x: hidden;

  .pagination-buttons_container {
    margin-top: 80px;
  }

  .previous_button,
  .next_button {
    background-color: rgba(119, 190, 29, 1);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 5px;
    width: 100px;
  }

  .previous_button:hover,
  .next_button:hover {
    background-color: #45a049;
  }

  .current_page {
    margin: 0 10px;
    font-size: 16px;
    color: white;
  }
}

.not-found {
  color: $white-color;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 47px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
}

.dropdown-list li {
  padding: 8px 16px;
  cursor: pointer;
  background-color: rgba(27, 23, 41, 1);
}

.sort-dropdown {
  position: relative;
  display: inline-block;

  &:hover .dropdown-list {
    display: block;
  }
}

.catalog-header__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  width: 255px;
  height: 19px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.dropdown-list {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(27, 23, 41, 1);
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  width: 255px;
  height: 19px;
}

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

      .product-cards {
        width: 60vw;
      }
      .product-card-container {
        width: 60vw;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
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

@media (max-width: 768px) {
  .catalog {
    width: 90vw;
    margin: auto;
    display: flex;

    .catalog-container {
      width: 90vw;
      margin: auto;

      .catalog-products {
        margin: auto;
        .catalog-header {
          display: flex;
          flex-direction: column;

          h2 {
            font-size: 28px;
          }
        }

        .product-card-container {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 70px;
          margin: auto;
          margin-top: 45px;

          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            &:hover {
              transform: scale(1.02);
              box-shadow: 0px 8px 12px rgba(200, 200, 200, 0.4);
            }
          }
        }
      }
    }
    .catalog-header {
      .catalog-header__button {
        width: auto;
        margin-top: 50px;
      }
    }
  }
}

@media (max-width: 380px) {
  .catalog {
    .catalog-container {
      display: flex;
      flex-direction: column;
      margin: auto;
      margin-top: 50px;
      width: 100%;

      .catalog-products {
        margin: auto;
        max-width: 90vw;
        margin-top: 50px;

        .catalog-header {
          display: flex;
          flex-direction: column;

          h2 {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .catalog-header__button {
            width: auto;
          }
        }
      }
    }
  }
}
</style>
