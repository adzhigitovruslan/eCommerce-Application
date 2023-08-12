

<template>
    <div class="gradient-background">
        <nav>
        <router-link to="/" class="logo-link"><img src="../assets/images/main_logo.png" alt="logo"><span class="link-text">Playnchill</span></router-link> |
    <router-link to="/login">Log in</router-link> |
    <router-link to="/catalog">Products</router-link> |
    <router-link to="/cart" class="cart-link"><img :src="cartSvg" alt="Cart" style="fill: #FFFFFF;"></router-link> |
    <router-link to="/about">About us</router-link>
  </nav>
    </div>
        
   
   

</template>

<script lang="ts">
import cartSvg from "../assets/images/cart.svg"; 

export default {
  data() {
    return {
      cartSvg: cartSvg
    };
  }
};
</script>

<style scoped lang="scss">

.gradient-background {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(0deg, #06030F, #06030F, #13101B, #13101B);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #13101B;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    margin: 10px;
    text-decoration: none;
    color: #FFFFFF;
    font-family: Manrope;
font-size: 16px;
font-weight: 600;
line-height: 21px;
letter-spacing: 0em;
text-align: left;


    &.router-link-exact-active {
      color: #42b983;
    }
    
  }
}

.cart-link {
  display: inline-block;
  vertical-align: middle; 
  margin-right: 10px;}

  .cart-link img {
    height: 25px;
  }

  .logo-link {
  display: flex;
  align-items: center;
  font-family: Manrope;
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
    color: #FFFFFF;
  }}
</style>