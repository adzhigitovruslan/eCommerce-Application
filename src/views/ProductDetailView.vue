<template>
  <section class="detail-view" ref="section">
    <div :class="`backgroundImg ${isLoading}`" ref="backgroundImg"></div>
    <TheCardContent
      :coverImg="coverImg || ''"
      :name="name"
      :priceStr="priceStr"
      :genre="`${genre}`"
      :publisher="`${publisher}`"
      :ratings="+ratings"
    />
    <TheCardCarousel :imgArr="imgArrFilter" />
    <TheCardDescription :description="description" :requirements="`${requirements}`" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useStore } from 'vuex';
import { ProductItem } from '@/types/interfaces/productItem';
import TheCardContent from '@/components/product-detail/TheCardContent.vue';
import TheCardCarousel from '@/components/product-detail/TheCardCarousel.vue';
import TheCardDescription from '@/components/product-detail/TheCardDescription.vue';

const store = useStore();

if (!store.getters['allProducts'][0]) await store.dispatch('fetchProducts');

const isLoading = ref('');
const backgroundImg = ref<HTMLElement | null>(null);
const location = window.location.pathname;
const prodId = location.split('/product:')[1];
const router = useRouter();
const beforeRouteLeave = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (backgroundImg.value) {
    backgroundImg.value.style.display = 'none';
  }
  next();
};
const products = store.getters['allProducts'];
const currentProd: ProductItem = products.find((prod: ProductItem) => prod.slug['en-US'] === prodId);
const images = currentProd.masterVariant.images;
const coverImg = images.find((img) => img.label === 'Cover')?.url;
const name = currentProd.name['en-US'];
const price = currentProd.masterVariant.prices[0].value;
const firstPrice = `${price.centAmount}`.length === 3 ? `${price.centAmount}`[1] : `${price.centAmount}`.slice(0, 2);
const secondPrice =
  `${price.centAmount}`.length === 3 ? `${price.centAmount}`.slice(1) : `${price.centAmount}`.slice(2);
const priceStr = `${firstPrice}.${secondPrice} ${price.currencyCode}`;
const genre = currentProd.masterVariant.attributes.find((att) => att.name === 'Genre')?.value;
const publisher = currentProd.masterVariant.attributes.find((att) => att.name === 'Publisher')?.value;
const ratings = `${currentProd.masterVariant.attributes.find((att) => att.name === 'Ratings')?.value}`;
const imgArr = images.map((img, index) => {
  const isSlide = !img.label;

  return {
    url: img.url,
    id: index,
    isSlide: isSlide,
  };
});
const imgArrFilter = imgArr.filter((img) => img.isSlide);
const description = currentProd.description['en-US'];
const requirements = currentProd.masterVariant.attributes.find((att) => att.name === 'System_Requirements')?.value;

onMounted(async () => {
  if (backgroundImg.value)
    backgroundImg.value.style.backgroundImage = `linear-gradient(to bottom, transparent, transparent 50%, #06030f 90%),
    url('${images[2].url}')`;
  setTimeout(() => {
    isLoading.value = 'active';
  }, 1000);
});

router.beforeEach(beforeRouteLeave);
</script>

<style lang="scss" scoped>
.backgroundImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 700px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0%;
  transition: all 0.3s linear;
}

.backgroundImg.active {
  opacity: 20%;
}
</style>
