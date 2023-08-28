<template>
  <div class="catalog">
    <h1>This is a catalog</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <h1>{{ product.masterData.current.name['en-US'] }}</h1>
        <p>{{ product.masterData.current.description['en-US'] }}</p>
        <p>Price: {{ product.masterData.current.masterVariant.prices[0].value.centAmount / 100 }} USD</p>
        <img :src="getImageUrl(product.masterData.current.masterVariant.images[0].url)" alt="Product Image" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { Game } from '@/types/interfaces/game';
import { useStore } from 'vuex';

export default {
  computed: {
    products(): Game[] {
      const store = useStore();

      return store.state.products.products;
    },
  },
  created() {
    const store = useStore();

    store.dispatch('fetchProducts');
  },
  methods: {
    ...mapActions(['fetchProducts']),
    getImageUrl(url: string) {
      return `${url}`;
    },
  },
};
</script>
