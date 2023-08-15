<template>
  <div class="container">
    <div class="auth__wrapper">
      <div class="auth__header">
        <div class="auth__logo-wrapper">
          <div class="auth__logo">
            <img src="@/assets/icon_logo2.png" alt="main_logo" />
          </div>
          <h1>Playnchill</h1>
        </div>
        <base-auth-button close mode="dark">close</base-auth-button>
      </div>
      <slot class="slot"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #010101;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 350px;
    width: 100%;
    padding: 15px 20px;
    background: #1c1c1c;
    border-radius: 10px;
    border: 1px solid #383636;
  }
  &__logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    h1 {
      color: #f3f3f3;
      font-weight: 600;
      font-size: 20px;
    }
  }
  &__logo {
    width: 25px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
