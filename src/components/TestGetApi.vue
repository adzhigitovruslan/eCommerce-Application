<template>
  <div>
    <div v-if="!isLoggedIn">
      <h3>Login</h3>
      <div>
        <label for="text">Email</label>
        <input id="text" type="text" v-model.trim="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model.trim="password" />
      </div>
      <button @click.prevent="login">Login</button>
    </div>
    <button v-else @click.prevent="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getIsLoggedIn;
    },
  },
  methods: {
    async login() {
      console.log('login');

      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });

      this.email = '';
      this.password = '';
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
});
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
