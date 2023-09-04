<template>
  <div class="detail-view__content">
    <img :src="props.coverImg" alt="logo" class="detail-view__content__cover" />
    <div class="detail-view__content__card">
      <h2 class="detail-view__content__card__title">{{ props.name }}</h2>
      <p class="detail-view__content__card__condition">In stock</p>
      <p class="detail-view__content__card__price">{{ props.priceStr }}</p>
      <div class="detail-view__content__card__buttons">
        <button class="detail-view__content__card__buttons__buy">Buy</button>
        <button class="detail-view__content__card__buttons__cart">Into cart</button>
      </div>
      <div class="detail-view__content__card__short-info">
        <div class="detail-view__content__card__short-info__box">
          <p class="detail-view__content__card__short-info__box__title">Genre</p>
          <p class="detail-view__content__card__short-info__box__content">{{ props.genre }}</p>
        </div>
        <div class="detail-view__content__card__short-info__box">
          <p class="detail-view__content__card__short-info__box__title">Publisher</p>
          <p class="detail-view__content__card__short-info__box__content">{{ props.publisher }}</p>
        </div>
        <div class="detail-view__content__card__short-info__box">
          <p class="detail-view__content__card__short-info__box__title">Ratings</p>
          <p class="detail-view__content__card__short-info__box__content">{{ props.ratings }}</p>
        </div>
      </div>
      <div class="detail-view__content__card__add-button">
        <button class="detail-view__content__card__add-button__short-buy">Instant delivery</button>
        <div class="detail-view__content__card__add-button__confirmation">
          <img
            src="@/assets/images/confirmation.svg"
            alt="confirmation"
            class="detail-view__content__card__add-button__confirmation__icon"
          />
          <p class="detail-view__content__card__add-button__confirmation__content">Quality assurance</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  coverImg: string;
  name: string;
  priceStr: string;
  genre: string;
  publisher: string;
  ratings: number;
}>();
</script>

<style lang="scss" scoped>
.detail-view {
  &__content {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;

    &__cover {
      max-width: 350px;
      max-height: 478px;
      border-radius: 15px;
    }

    &__card {
      margin-left: 60px;
      color: #ffffff;
      text-align: left;
      line-height: 130%;

      &__title {
        margin-bottom: 20px;
        font-size: 40px;
        font-weight: 800;
      }

      &__condition {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;
      }

      &__condition::before {
        display: inline-block;
        margin-right: 9px;
        content: '';
        width: 8px;
        height: 8px;
        background-color: #01cb62;
        border-radius: 50%;
      }

      &__price {
        margin-bottom: 20px;
        font-size: 36px;
        font-weight: 700;
        line-height: 160%;
      }

      &__buttons {
        margin-bottom: 40px;

        &__cart,
        &__buy {
          width: 167px;
          height: 73px;
          color: #fff;
          font-family: Manrope;
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 130%;
          border-radius: 15px;
        }

        &__buy {
          background-color: #77be1d;
          margin-right: 10px;
        }

        &__cart {
          background-color: inherit;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
      }

      &__short-info {
        display: flex;
        margin-bottom: 40px;

        &__box {
          display: flex;
          flex-direction: column;
          margin-right: 75px;
          line-height: 130%;

          &__title {
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: 400;
          }

          &__content {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }

      &__add-button {
        display: flex;

        &__short-buy {
          margin-right: 29px;
          padding: 20px 25px;
          background-color: inherit;
          color: #97e238;
          font-size: 20px;
          font-weight: 400;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
        }

        &__confirmation {
          display: flex;
          align-items: center;

          &__icon {
            margin-right: 10px;
            width: 22px;
            height: 22px;
          }

          &__content {
            display: inline-block;
            text-align: right;
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
