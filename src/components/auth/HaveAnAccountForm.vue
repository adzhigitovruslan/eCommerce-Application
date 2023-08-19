<template>
  <div class="account-form" v-if="mode === 'login'">
    Don't have an account ?
    <router-link class="button" :to="{ name: 'signup' }"> Sign up </router-link>
  </div>
  <div class="account-form" v-else-if="mode === 'signup'">
    Already have an account ?
    <router-link class="button" :to="{ name: 'login' }"> Login </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mode: string;
}>();
</script>

<style lang="scss">
.account-form {
  color: #fefefecc;
  font-size: 13px;
  margin-top: 10px;
  & .button {
    color: #fefefe;
    font-weight: 800;
  }
}
</style>
