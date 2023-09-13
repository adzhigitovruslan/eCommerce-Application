<template>
  <div class="cart-container">
    <h1 class="cart__header">
      Корзина <span class="cart__header-total">{{ total }}</span>
    </h1>
    <div class="cart-wrapper">
      <div class="cart">
        <div class="cart__board board">
          <h3 class="board__header">Войдите или зарегистрируйтесь</h3>
          <p class="board__text">
            Вы сможете накапливать бонусные рубли и использовать их при оплате до 50% стоимости товаров.
          </p>
          <button class="board__in-button">Войти</button>
        </div>
        <ul class="cart__list">
          <!-- <li v-for="product in cartProducts" :key="product.id">
        {{ product.name }} - {{ product.price }} - {{ product.quantity }}
      </li> -->
          <li class="cart__item item-cart">
            <div class="item-cart__img">
              <img src="@/assets/images/apex_legends.png" alt="" />
            </div>
            <div class="item-cart__info">
              <h3 class="item-cart__header">Minecraft</h3>
              <div class="item-cart__price-count">
                <span class="item-cart__new-price">349 P</span>
                <span class="item-cart__discount">-25%</span>
                <span class="item-cart__old-price">599 Р</span>
              </div>
              <div class="item-cart__counter_item">
                <p>Total amount</p>
                <div class="item-cart__counter-wrapper">
                  <button>-</button>
                  <span class="item-cart__counter">0</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          </li>
          <li class="cart__item item-cart">
            <div class="item-cart__img">
              <img src="@/assets/images/apex_legends.png" alt="" />
            </div>
            <div class="item-cart__info">
              <h3 class="item-cart__header">Minecraft</h3>
              <div class="item-cart__price-count">
                <span class="item-cart__new-price">349 P</span>
                <span class="item-cart__discount">-25%</span>
                <span class="item-cart__old-price">599 Р</span>
              </div>
              <div class="item-cart__counter_item">
                <p>Total amount</p>
                <div class="item-cart__counter-wrapper">
                  <button>-</button>
                  <span class="item-cart__counter">0</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="order">
        <div class="order__block">
          <h3 class="order__header"><span>5 </span>товаров</h3>
          <div class="order__price">4999 Р</div>
          <input class="order__input" type="text" placeholder="Введите купон" />
          <button class="order__button">Оформить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartProducts', 'cartTotal']),
    total() {
      return this.cartTotal;
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  padding-bottom: 30px;
  padding-top: 30px;
  &__button {
    padding: 10px 20px;
    background: rgba(119, 190, 29, 0.1);
    font-size: 16px;
    color: #77be1d;
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__input {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
    background: rgba(119, 190, 29, 0.1);
    color: #77be1d;
    &::placeholder {
      color: #77be1d;
      text-align: center;
    }
  }
  &__header {
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    @media (max-width: 1200px) {
      font-size: calc(18px + (20 - 18) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__price {
    color: #fff;
    font-weight: 600;
    font-size: 36px;
    @media (max-width: 1200px) {
      font-size: calc(25px + (36 - 25) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__block {
    border: 1px solid #ffffff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
}
.cart-container {
  max-width: 80%;
  margin: 0 auto;
}
.cart-wrapper {
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.cart {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 30px;
  padding-top: 30px;
  @media (max-width: 1200px) {
    padding-top: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
    padding-bottom: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
  }
  &__header {
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%;
    text-align: left;
    @media (max-width: 1200px) {
      font-size: calc(32px + (48 - 32) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__header-total {
    color: #77be1d;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%;
    @media (max-width: 1200px) {
      font-size: calc(32px + (48 - 32) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    @media (max-width: 1200px) {
      gap: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__item {
    width: 100%;
  }
  & .item-cart {
    display: flex;
    gap: 30px;
    @media (max-width: 1200px) {
      gap: calc(10px + (30 - 10) * ((100vw - 320px) / (1200 - 320)));
    }
    &__img {
      width: 200px;
      height: 240px;
      border-radius: 6px;
      overflow: hidden;
      @media (max-width: 1200px) {
        height: calc(120px + (240 - 120) * ((100vw - 320px) / (1200 - 320)));
        width: calc(90px + (200 - 90) * ((100vw - 320px) / (1200 - 320)));
      }
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__header {
      color: #fff;
      font-size: 28px;
      font-weight: 500;
      line-height: 130%;
      text-align: left;
      @media (max-width: 1200px) {
        font-size: calc(18px + (28 - 18) * ((100vw - 320px) / (1200 - 320)));
      }
    }
    &__price-count {
      display: flex;
      gap: 15px;
    }
    &__new-price {
      display: flex;
      align-items: flex-end;
      color: #fff;
      font-size: 32px;
      font-weight: 700;
      line-height: 130%;
      @media (max-width: 1200px) {
        font-size: calc(18px + (28 - 18) * ((100vw - 320px) / (1200 - 320)));
      }
    }
    &__discount {
      display: flex;
      align-items: flex-end;
      color: #77be1d;
      font-size: 24px;
      font-weight: 700;
      line-height: 130%;
      @media (max-width: 1200px) {
        font-size: calc(16px + (28 - 16) * ((100vw - 320px) / (1200 - 320)));
      }
    }
    &__old-price {
      display: flex;
      align-items: flex-end;
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      line-height: 130%;
      opacity: 0.2;
      @media (max-width: 1200px) {
        font-size: calc(16px + (28 - 16) * ((100vw - 320px) / (1200 - 320)));
      }
    }
    &__counter {
      color: #fff;
      font-size: 32px;
      font-weight: 500;
      line-height: 130%;
      @media (max-width: 1200px) {
        font-size: calc(18px + (32 - 18) * ((100vw - 320px) / (1200 - 320)));
      }
    }
    &__counter_item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      @media (max-width: 1200px) {
        gap: calc(10px + (15 - 10) * ((100vw - 320px) / (1200 - 320)));
      }
      p {
        color: #fff;
        font-size: 24px;
        font-weight: 700;
        text-align: left;
        white-space: nowrap;
        @media (max-width: 1200px) {
          font-size: calc(16px + (24 - 16) * ((100vw - 320px) / (1200 - 320)));
        }
      }
    }
    &__counter-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
      button {
        background: none;
        color: #fff;
        font-size: 32px;
        cursor: pointer;
        @media (max-width: 1200px) {
          font-size: calc(25px + (32 - 25) * ((100vw - 320px) / (1200 - 320)));
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
.board {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: 30px;
  border-radius: 15px;
  background: url('@/assets/images/board.png');
  background-repeat: no-repeat;
  background-size: cover;
  &__in-button {
    display: inline-flex;
    padding: 13px 25px 16px 25px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 10px;
    background: #fff;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__header {
    color: #fff;
    font-size: 32px;
    font-weight: 800;
    line-height: 130%;
    text-align: left;
    @media (max-width: 1200px) {
      font-size: calc(16px + (32 - 16) * ((100vw - 320px) / (1200 - 320)));
    }
  }
  &__text {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    line-height: 130%;
    text-align: left;
    max-width: 80%;
    @media (max-width: 1200px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (1200 - 320)));
    }
  }
}
</style>
