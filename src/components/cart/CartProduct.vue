<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div class="item-cart">
    <div class="item-cart__img">
      <img src="@/assets/images/apex_legends.png" alt="" />
    </div>
    <div class="item-cart__info">
      <h3 class="item-cart__header">{{ product.name['en-US'] }}</h3>
      <div class="item-cart__price-count">
        <span class="item-cart__new-price" v-if="discount">{{ newPrice }} P</span>
        <span class="item-cart__discount" v-if="newPrice"
          >- {{ Math.floor(((oldPrice - newPrice) / oldPrice) * 100) }} %</span
        >
        <span class="item-cart__old-price"
          >{{ product.price.value.centAmount.toFixed(product.price.value.fractionDigits) }} Р</span
        >
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
    <font-awesome-icon icon="fa-solid fa-xmark" />
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types/interfaces/cartItem';
import { ref } from 'vue';

const props = defineProps<{
  product: CartItem;
}>();

const newPrice = ref(props.product.price.discounted?.value.centAmount);
const oldPrice = ref(props.product.price.value.centAmount);
const discount = ref();

if (newPrice.value) {
  discount.value = Math.floor(((oldPrice.value - newPrice.value) / oldPrice.value) * 100);
}
</script>

<style lang="scss" scoped>
.item-cart {
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
</style>
