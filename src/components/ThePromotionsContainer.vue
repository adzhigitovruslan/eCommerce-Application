<template>
  <div class="promotions-container">
    <h2>Promotions<span>%</span></h2>
    <div class="promotions-list">
      <div v-for="(game, index) in discountedGames" :key="index" class="promotion-card">
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
      games: (gamesData as { Games: Game[] }).Games,
    };
  },
  computed: {
    discountedGames(): Game[] {
      const games = (this as any).games; // Use 'as any' for type assertion
      const discountedGames = games.filter((game: Game) => game.discount > 0);

      const shuffledGames = discountedGames.slice();

      for (let i = shuffledGames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledGames[i], shuffledGames[j]] = [shuffledGames[j], shuffledGames[i]];
      }

      return shuffledGames.slice(0, 4);
    },
  },
  methods: {
    getImagePath(image: string): string {
      return require(`@/assets/images/${image}`);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';
h2 {
  font-family: $manrope-font-family;
  color: $white-color;
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;

  span {
    color: #77be1d;
    margin-left: 10px;
  }
}
.promotions-container {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;

  .promotions-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;

    .promotion-card {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: left;
      max-width: 620px;
      height: 464px;

      .game-image {
        object-fit: cover;
        max-width: 620px;
        width: 550px;
        height: 319px;
        border-radius: 15px;
        margin-bottom: 20px;
        cursor: pointer;
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
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 15px;

    .promotions-list {
      justify-content: center;

      .promotion-card {
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>
