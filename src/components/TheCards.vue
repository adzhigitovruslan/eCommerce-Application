<template>
  <div class="card-container">
    <div class="card green">
      <h2>Start Playing Minecraft right now!</h2>
      <div class="game-info__price">
        <span class="game-info__new-price">$49.99</span>
        <span class="game-info__discount">-20%</span>
        <span class="game-info__old-price">$59.99</span>
      </div>
      <div class="game-info__buttons">
        <button class="game-info__button-cart">Add to Cart</button>
        <button class="game-info__button-favourites">Add to Favorites</button>
      </div>
      <img src="../assets/images/minecraft_slide1.png" alt="Yellow Card" class="green-card-img" />
    </div>
    <div class="card red">
      <h2>Play Minecraft Dungeons right now!</h2>
      <div class="game-info__price">
        <span class="game-info__new-price">$49.99</span>
        <span class="game-info__discount">-20%</span>
        <span class="game-info__old-price">$59.99</span>
      </div>
      <div class="game-info__buttons">
        <button class="game-info__button-cart">Add to Cart</button>
        <button class="game-info__button-favourites">Add to Favorites</button>
      </div>
      <img src="../assets/images/minecraft_slide2.png" alt="Red Card" class="red-card-img" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';

.card-container {
  display: flex;
  width: 80vw;
  justify-content: space-between;
  gap: 10px;
  margin-top: 100px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 550px;
  height: 360px;
  padding: 50px;
  padding-right: 150px;
  border-radius: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  color: $white-color;

  &:hover {
    transform: translateY(-5px);
  }
}

.green {
  background: linear-gradient(131.39deg, #1dbe53 -11.11%, #ace238 73.42%);
}

.red {
  background: linear-gradient(131.39deg, #ff3d23 -11.11%, #fda828 73.42%);
}

.green-card-img {
  position: relative;
  left: 290px;
  width: 262px;
  top: -400px;
}

.red-card-img {
  position: relative;
  width: 452px;
  left: 320px;
  top: -400px;
}

h2 {
  font-family: $manrope-font-family;
  font-size: 36px;
  font-weight: 800;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__price {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.game-info__new-price {
  width: 114px;
  height: 42px;
  font-family: $manrope-font-family;
  color: $white-color;
  font-size: 32px;
  font-weight: 800;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__discount {
  width: 51px;
  height: 26px;
  font-family: $manrope-font-family;
  font-size: 20px;
  font-weight: 800;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
}

.game-info__old-price {
  width: 71px;
  height: 26px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: line-through;
}

.game-info__buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.game-info__button-cart,
.game-info__button-favourites {
  height: 73px;
  padding: 23px 40px 27px 40px;
  border-radius: 15px;
  font-family: $manrope-font-family;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &.game-info__button-cart {
    border: none;
    background: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }

  &.game-info__button-favourites {
    background: rgba(255, 255, 255, 0.05);
    color: $white-color;
    border: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
