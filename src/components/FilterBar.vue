<template>
  <div class="filter-bar">
    <h3>Filters</h3>
    <div class="price-filter">
      <label for="price-range">Price Range:</label>
      <input type="range" id="price-range" v-model="priceRange" min="0" :max="maxPrice" />
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
export default {
  data() {
    return {
      priceRange: 0,
      maxPrice: 100, // Set your maximum price value
      categories: ['Category 1', 'Category 2', 'Category 3'], // Replace with your categories
      selectedCategories: [],
    };
  },
};
</script>

<style scoped>
.filter-bar {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
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
