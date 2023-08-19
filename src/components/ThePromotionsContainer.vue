<template>
    <div class="promotions-container">
      <h2>Promotions</h2>
      <div class="promotions-list">
        <div v-for="game in discountedGames" :key="game.key" class="promotion-card">
          <img :src="getImagePath(game.image)" :alt="game.name" class="game-image" />
          <div class="game-info">
            <div class="game-price-container">
              <div class="game-price">Price: ${{ game.price }}</div>
              <div class="game-discount">{{ game.discount }}% off</div>
            </div>
            <div class="game-name">{{ game.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import gamesData from '@/data.json';
  
  interface Game {
    key: number;
    name: string;
    productType: {
      typeId: string;
      key: string;
    };
    slug: string;
    price: number;
    discount: number;
    description: string;
    categories: {
      typeId: string;
      key: string;
    };
    platform: string[];
    'activation region': string;
    'system requirements': {
      'operating system': string;
      processor: string;
      memory: string;
      'graphics card': string;
      'disk space': string;
    };
    image: string;
  }
  
  export default {
    data() {
      return {
        games: gamesData.Games as Array<Game>,
      };
    },
    computed: {
      discountedGames(): Game[] {
        return this.games.filter((game: Game) => game.discount > 0);
      },
    },
    methods: {
    getImagePath(image: string): string {
      return require(`@/assets/${image}`);
    },
  },
  }
  ;
  </script>
  
  <style lang="scss">
  @import '@/assets/styles/global.scss';
  .promotions-container {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    /* Добавьте здесь дополнительные стили для контейнера */
  }
  
  .promotions-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* Добавьте здесь дополнительные стили для списка акций */
  }
  
  .promotion-card {
    padding: 16px;
    margin: 16px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 620px;
    height: 464px;
  
    /* Добавьте здесь дополнительные стили для карточки акции */
  }
  
  .game-image {
    object-fit: cover;
    width: 620px;
    height: 319px;
    border-radius: 15px;
  }
  
  .game-info {
    width: 265px;
    height: 113px;
    border-radius: 8px;
  }
  
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
    height: 39px;
    border-radius: 8px;
    font-family: $manrope-font-family;
    font-size: 14px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    background: rgba(119, 190, 29, 1);
    color: $white-color;
    text-align: center;
  }
  
  .game-price-container {
    display: flex;
    flex-direction: row;
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
  </style>
  