<template>
  <base-auth-wrapper>
    <form action="">
      <input type="text" />
      <input type="text" />
    </form>
  </base-auth-wrapper>
</template>

<style lang="scss" scoped>
.auth-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.auth-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.auth-enter-active {
  transition: all 0.3s ease-out;
}
.auth-leave-active {
  transition: all 0.3s ease-in;
}

.auth-enter-to,
.auth-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
