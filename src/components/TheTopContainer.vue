<template>
  <div class="top-games-container">
    <h2>Top 4 Games</h2>
    <div class="top-games-row">
      <div v-for="game in topGames" :key="game.key">
        <ProductCard :game="game" imageClass="top-four-image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gamesData from '@/data.json';
import { Game } from '@/components/game';
import ProductCard from '@/components/ProductCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ProductCard,
  },
  data() {
    return {
      games: (gamesData as { Games: Game[] }).Games,
    };
  },
  computed: {
    topGames(): Game[] {
      const shuffledGames = this.shuffleArray(this.games);

      return shuffledGames.slice(0, 4);
    },
  },
  methods: {
    shuffleArray(array: Game[]): Game[] {
      const shuffledArray = array.slice();

      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
    },
  },
});
</script>

<style scoped lang="scss">
.top-games-container {
  max-width: 80vw;
  display: grid;
  margin: auto;
  margin-top: 45px;
}

h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
  background-clip: text;
  -webkit-background-clip: text;
  color: white;
  margin-bottom: 45px;
}

.top-games-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80vw;
  margin: auto;
  gap: 15px;
}
</style>
