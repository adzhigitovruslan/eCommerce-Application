<template>
   
        <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/user-profile">Profile</router-link> |
    <router-link to="/catalog">Catalog</router-link> |
    <router-link to="/about">About us</router-link>
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