<template>
  <div>
    <div v-if="!isLoggedIn">
      <h3>Login</h3>
      <div>
        <label for="text">Email</label>
        <input id="text" type="text" v-model.trim="userData.email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model.trim="userData.password" />
      </div>
      <button @click.prevent="login">Login</button>
    </div>
    <button v-else @click.prevent="logout">Logout</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userData = reactive({
  email: '',
  password: '',
});
const isLoggedIn = computed(function () {
  return store.getters['customer/getIsLoggedIn'];
});

async function login() {
  await store.dispatch('customer/login', {
    email: userData.email,
    password: userData.password,
  });
  userData.email = '';
  userData.password = '';
}
function logout() {
  store.dispatch('customer/logout');
}
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
