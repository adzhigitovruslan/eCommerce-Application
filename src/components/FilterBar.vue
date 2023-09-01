<template>
  <div class="filter-bar">
    <h3>Filters</h3>
    <div class="price-filter">
      <label for="price-range">Price $:</label>

      <span>{{ priceFrom }}</span> to <span>{{ priceTo }}</span>
      <input
        type="range"
        id="price-range"
        min="0"
        :max="computedMaxPrice"
        @input="updatePriceRange($event)"
        :value="priceRange"
      />
      <span>{{ priceRange }}</span>
    </div>
    <div class="category-filter">
      <h4>Categories:</h4>
      <label v-for="(category, index) in categories" :key="index">
        <input type="checkbox" :value="category" v-model="selectedCategories" />
        {{ category }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      priceFrom: 0,
      priceTo: 200,
      categories: ['Category 1', 'Category 2', 'Category 3'],
      selectedCategories: [],
    };
  },
  computed: {
    ...mapState(['priceRange']),
    computedMaxPrice(): number {
      return this.priceTo;
    },
    priceRange(): number {
      return this.$store.state.products.priceRange;
    },
  },
  methods: {
    ...mapMutations('products', ['updatePriceRange']),
    updatePriceRange(event: Event | null) {
      if (event && event.target instanceof HTMLInputElement) {
        const newPriceRange = parseFloat(event.target.value);

        this.$store.commit('updatePriceRange', newPriceRange);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';
.filter-bar {
  padding: 10px;
  border: 2px solid rgba(30, 28, 39, 1);
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  font-family: $manrope-font-family;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
}

.price-filter {
  margin-bottom: 10px;
}

.category-filter {
  h4 {
    margin-bottom: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }
}
</style>
