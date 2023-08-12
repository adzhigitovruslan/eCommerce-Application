<template>
   
        <nav>
    <router-link to="/">HOME</router-link> |
    <router-link to="/login">LOG IN</router-link> |
    <router-link to="/catalog">PRODUCTS</router-link> |
    <router-link to="/cart">CART</router-link> |
    <router-link to="/about">ABOUT US</router-link>
  </nav>
   

</template>

<style scoped lang="scss">

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
    
  }
}
</style>