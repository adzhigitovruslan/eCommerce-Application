<template>
  <div class="promotion-card" :key="product.id">
    <img
      :src="getCoverImageUrl(product.masterData.current.masterVariant.images)"
      :alt="product.masterData.current.name['en-US']"
      :class="imageClass"
    />
    <div class="game-info" :class="gameInfo">
      <div class="game-price-container">
        <div class="game-price" :class="gamePrice">Price: ${{ getProductPrice(product) }}</div>
        <div class="game-discount" :class="gameDiscount">{{ getProductDiscount(product) }}% off</div>
      </div>
      <div class="game-name">{{ product.masterData.current.name['en-US'] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ProductItem } from '@/types/interfaces/productItem';

interface Image {
  dimensions: {
    width: number;
    height: number;
  };
  label: string;
  url: string;
}

export default defineComponent({
  props: {
    product: {
      type: Object as () => ProductItem,
      required: true,
    },
    imageClass: String,
    gameDiscount: String,
    gamePrice: String,
    gameInfo: String,
  },
  methods: {
    getCoverImageUrl(images: Image[]): string {
      const coverImage = images.find((image) => image.label === 'Cover');

      const imageUrl = coverImage ? coverImage.url : images.length > 0 ? images[0].url : '';

      return imageUrl;
    },
    getProductPrice(product: ProductItem): string {
      const currentVariant = product.masterData.current.masterVariant;
      const hasDiscountedPrice = !!currentVariant.prices[0]?.discounted?.value?.centAmount;

      if (hasDiscountedPrice) {
        const discountedPrice = currentVariant.prices[0]?.discounted?.value?.centAmount || 0;

        return (discountedPrice / 100).toFixed(2);
      } else {
        const regularPrice = currentVariant.prices[0].value.centAmount;

        return (regularPrice / 100).toFixed(2);
      }
    },
    getProductDiscount(product: ProductItem) {
      if (product.masterData.current.masterVariant.prices[0]?.discounted?.value?.centAmount) {
        let oldPrice = product.masterData.current.masterVariant.prices[0].value.centAmount;
        let newPrice = product.masterData.current.masterVariant.prices[0]?.discounted?.value?.centAmount;
        let discount = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);

        return discount;
      } else {
        return 0;
      }
    },
  },
  watch: {
    'product.masterData.current.masterVariant.prices[0]?.discounted?.value?.centAmount'(newDiscount, oldDiscount) {
      if (newDiscount !== oldDiscount) {
        this.$emit('productDiscountChanged', Boolean(newDiscount));
      }
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

.promotion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.game-info {
  width: 265px;
  height: 113px;
  border-radius: 8px;

  .game-price {
    font-family: $manrope-font-family;
    color: $white-color;
    font-size: 24px;
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;
  }

  .game-discount {
    width: 62px;
    border-radius: 8px;
    padding: 5px;
    font-family: $manrope-font-family;
    font-size: 14px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    background: rgba(119, 190, 29, 1);
    color: $white-color;
    text-align: center;
    margin: auto;
  }
}

.game-price-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-name {
  font-family: $roboto-font-family;
  color: $white-color;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}

.image-mode {
  max-width: 265px;
  height: 400px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}

.image-mode-promo {
  object-fit: cover;
  width: 500px;
  max-width: 620px;
  height: 319px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}

.top-four-image {
  max-width: 270px;
  height: 450px;
  border-radius: 15px;
  margin-bottom: 10px;
  object-fit: cover;
  cursor: pointer;
}

@media (max-width: 768px) {
  .image-mode-promo {
    object-fit: cover;
    max-width: 122px;
    width: 122px;
    height: 183px;
    border-radius: 9px;
    margin-bottom: 0px;
    cursor: pointer;
  }

  .game-info {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    border-radius: 8px;

    .game-name {
      margin-bottom: 0px;
    }
  }

  .game-info-promo {
    width: 135px;
    .game-price-promo {
      font-size: 18px;
      font-weight: 800;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
    }

    .game-discount-promo {
      font-size: 18px;
      font-weight: 500;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
      color: rgba(119, 190, 29, 1);
      background: none;
      margin: 0;
    }
  }
}
</style>
