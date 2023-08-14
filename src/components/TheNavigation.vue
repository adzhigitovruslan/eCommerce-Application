<template>
  <div class="gradient-background">
    <!-- Верхний отдел навигации -->
    <nav class="top-navigation">
      <div>
        <span @click="changeLanguage" class="language-icon">EN</span>
      |
      <span @click="changeCurrency" class="currency-icon">
        <font-awesome-icon :icon="['fas', 'dollar-sign']" />
      </span>
      </div>
     <div>
      <router-link to="/catalog">Products</router-link> |
      <router-link :to="{ path: '/reviews' }" class="nav-link" data-type="reviews" >Reviews</router-link> |
    <router-link :to="{ path: '/promotions' }" class="nav-link" data-type="promotions">Promotions</router-link> |
      <router-link to="/about">About us</router-link>
     </div>
    </nav>

    <!-- Нижний отдел навигации -->
    <nav class="bottom-navigation">
      <router-link to="/" class="logo-link">
        <img src="../assets/images/main_logo.png" alt="logo" />
        <span class="link-text">Playnchill</span>
      </router-link>
      |
      <input v-model="searchTerm" type="text" placeholder="Search products" class="search-input" />
      |
      <router-link to="/login">Log in</router-link> |
      <router-link to="/cart" class="cart-link">
        <img :src="cartSvg" alt="Cart" style="fill: #ffffff" />
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cartSvg from '../assets/images/cart.svg';

export default defineComponent({
  data() {
    return {
      cartSvg: cartSvg,
      selectedCurrency: '$',
      selectedLanguage: 'EN', 
      searchTerm: '',
    };
  },
  methods: {
    changeLanguage() {
      this.selectedLanguage = this.selectedLanguage === 'EN' ? 'RU' : 'EN';
    },
    changeCurrency() {
      this.selectedCurrency = this.selectedCurrency === '$' ? '€' : '$';
    },
  },
});
</script>

<style scoped lang="scss">
$white-color: white;
$font-family: Manrope, sans-serif;
.gradient-background {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(0deg, #06030f, #06030f, #13101b, #13101b);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #13101b;
}

.top-navigation {
  padding-top: 25px;
height: 34px; 
color: $white-color;

.language-icon,
.currency-icon {
    cursor: pointer;
    margin: 0 5px;
  }

  .nav-link {
  color: $white-color; 

  &[data-type="reviews"], &[data-type="promotions"] {
    &.router-link-exact-active {
      color: #808080; 
      font-weight: 600; 
    }
  }
}}

nav {
  width: 60vw;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  font-family: $font-family;
  margin: 0 auto;

  a {
    font-weight: bold;
    margin: 10px;
    text-decoration: none;
    color: #ffffff;
    font-family: $font-family;
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;

    &.router-link-exact-active {
      color: #808080;
      font-weight: 600;
    }
  }
}

.cart-link {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.cart-link img {
  height: 25px;
}

.logo-link {
  display: flex;
  align-items: center;
  font-family: $font-family;
  font-size: 32px;
  font-weight: 800;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  text-decoration: none;
  color: inherit;

  img {
    margin-right: 10px;
    height: 29px;
    color: white;
  }

  .link-text {
    white-space: nowrap;
    color: #ffffff;
  }
}

.language-icon {
  color: $white-color;
  font-family: $font-family;
}

.currency-icon {
  color: $white-color; 
}
</style>
