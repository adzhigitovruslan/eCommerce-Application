<template>
  <div class="container">
    <div class="auth__wrapper">
      <div class="auth__header">
        <div class="auth__logo">Logo</div>
        <base-auth-button mode="dark">asdf</base-auth-button>
      </div>
    </div>
    <!-- <slot class="slot"></slot> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #1e1e1e;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth__wrapper {
  max-width: 300px;
  width: 100%;
}
</style>
