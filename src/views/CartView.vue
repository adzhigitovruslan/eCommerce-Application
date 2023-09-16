<template>
  <div class="cart-container">
    <h1 class="cart__header">
      Корзина <span class="cart__header-total">{{ getCartQuantity }}</span>
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
          <li class="cart__item item-cart" v-for="product in cartProducts" :key="product.id">
            <CartProduct :product="product" />
          </li>
        </ul>
        <div class="cart__remove-btn">
          <button>Очистить корзину</button>
        </div>
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
import { defineComponent } from 'vue';
import CartProduct from '@/components/cart/CartProduct.vue';
import { CartItem } from '@/types/interfaces/cartItem';

export default defineComponent({
  components: {
    CartProduct,
  },
  computed: {
    getCartQuantity() {
      return this.$store.getters['cart/getCartQuantity'];
    },
    cartProducts(): CartItem[] {
      return this.$store.getters['cart/cartProducts'];
    },
  },
});
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
  &__remove-btn {
    display: flex;
    & button {
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 10px;
      background: rgba(119, 190, 29, 0.1);
      color: #77be1d;
      transition: 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
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
    svg {
      font-size: 25px;
      color: #ffffff;
      margin-left: auto;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      @media (max-width: 1200px) {
        font-size: calc(18px + (25 - 18) * ((100vw - 320px) / (1200 - 320)));
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
