<template>
  <img v-if="loading" src="@/assets/images/eater-1s-200px.gif" />
  <ul v-else>
    <li v-for="product in products" :key="product.id">{{ product.name }} - {{ product.price }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState('products', ['products']),
  },
  created() {
    this.loading = true;
    this.fetchProducts('games').then(() => (this.loading = false));
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'addProductToCart']),
  },
});
</script>
