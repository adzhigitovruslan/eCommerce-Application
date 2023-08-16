<template>
  <header class="header">
    <nav class="top-navigation">
      <div>
        <form style="visibility: hidden">
          <label for="languageSelect"></label>
          <select id="languageSelect" v-model="selectedLanguage">
            <option class="language-icon" value="EN">EN</option>
            <option value="RU">RU</option>
          </select>

          <label for="currencySelect"></label>
          <select id="currencySelect" v-model="selectedCurrency">
            <option value="$"><span class="icon">$</span> USD</option>
            <option value="€"><span class="icon">€</span> EURO</option>
          </select>
        </form>
      </div>
      <div>
        <router-link
          to="/catalog"
          class="nav-link"
          :class="{ active: activeLink === 'catalog' }"
          data-type="catalog"
          @click="setActiveLink('catalog')"
          >Products</router-link
        >
        |
        <router-link
          to="/#reviews"
          class="nav-link reviews"
          :class="{ active: activeLink === 'reviews' }"
          data-type="reviews"
          @click="setActiveLink('reviews')"
          >Reviews</router-link
        >
        |
        <router-link
          to="/#promotions"
          class="nav-link promotions"
          :class="{ active: activeLink === 'promotions' }"
          data-type="promotions"
          @click="setActiveLink('promotions')"
          >Promotions</router-link
        >
        |
        <router-link
          to="/about"
          class="nav-link about"
          :class="{ active: activeLink === 'about' }"
          data-type="about"
          @click="setActiveLink('about')"
          >About us</router-link
        >
      </div>
    </nav>

    <nav class="bottom-navigation">
      <router-link
        to="/"
        class="logo-link nav-link"
        :class="{ active: activeLink === 'logo' }"
        data-type="logo"
        @click="setActiveLink('logo')"
      >
        <img src="../assets/images/main_logo.png" alt="logo" />
        <span class="link-text">Playnchill</span>
      </router-link>
      <div class="search-input">
        <input v-model="searchTerm" type="text" placeholder="Search products" class="search-input" />
        <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
      </div>
      <div>
        <router-link
          to="/login"
          class="nav-link"
          :class="{ active: activeLink === 'login' }"
          data-type="login"
          @click="setActiveLink('login')"
          >Log in</router-link
        >
        |
        <router-link
          to="/cart"
          class="nav-link cart-link"
          :class="{ active: activeLink === 'cart' }"
          data-type="cart"
          @click="setActiveLink('cart')"
        >
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      selectedCurrency: '$',
      selectedLanguage: 'EN',
      searchTerm: '',
      activeLink: '',
    };
  },
  methods: {
    setActiveLink(linkType: string) {
      this.activeLink = linkType;
    },
  },
});
</script>

<style scoped lang="scss">
$white-color: white;
$font-family: Manrope, sans-serif;

.header {
  height: 157px;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 40vw;
  height: 66px;
  border: none;
  padding-left: 15px;
  box-sizing: border-box;
  outline: none;
  color: white;
  border-radius: 15px;
  background: rgba(196, 196, 196, 0.05);
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #ffffff33;
  cursor: pointer;
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

  .bottom-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-link {
    color: $white-color;
  }
}

nav {
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $font-family;
  margin: 0 auto;
  margin-bottom: 24px;

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
  }
}

.nav-link.active {
  color: #808080;
  font-weight: 600;
}

nav .nav-link:hover {
  color: #a0a0a0;
}

.cart-link {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  color: #ffffff;

  &:hover {
    color: #808080;
  }

  &:active {
    color: #a0a0a0;
  }
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
  margin: 0;
  padding: 0;

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

select {
  background-color: black;
  color: white;
  border: none;
}

option {
  background-color: black;
  color: white;
  padding: 5px;
}

.icon {
  margin-right: 5px;
}

option:checked {
  background-color: #808080;
  font-weight: bold;
}
</style>
