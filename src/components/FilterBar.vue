<template>
  <div class="filter-bar">
    <h2>Filters</h2>
    <div class="price-filter">
      <label for="price-range">Price $:</label>
      <br />
      <div class="price-range_label">
        <span> from {{ priceFrom }}</span> <span> to {{ priceRange }}</span>
      </div>
      <br />
      <input
        type="range"
        id="price-range"
        min="0"
        class="custom-price-range"
        :max="200"
        @input="updatePriceRange($event)"
        :value="priceRange"
        step="10"
      />
    </div>
    <div class="category-filter">
      <div class="category-item">
        <label for="all">
          <input type="checkbox" id="all" class="checkbox" v-model="selectedCategories.All.selected" />
          All
        </label>
      </div>
      <div class="category-item">
        <label for="merch">
          <input
            type="checkbox"
            class="checkbox"
            id="merch"
            v-model="selectedCategories.Merch.selected"
            @change="handleProductChange"
          />
          Merch
        </label>
      </div>
      <div class="category-item">
        <label for="games">
          <input
            type="checkbox"
            class="checkbox"
            id="games"
            v-model="selectedCategories.Games.selected"
            @change="handleProductChange"
          />
          Games
        </label>
      </div>

      <div>
        <h2>Genres</h2>
        <label for="moba" class="games-label">
          <input type="checkbox" id="moba" v-model="selectedCategories.MOBA.selected" />
          Multiplayer Online Battle Arena
        </label>
        <label for="shooter" class="games-label">
          <input type="checkbox" id="shooter" v-model="selectedCategories.Shooter.selected" />
          Shooter
        </label>
        <label for="battleRoyale" class="games-label">
          <input type="checkbox" id="battleRoyale" v-model="selectedCategories.BattleRoyale.selected" />
          Battle Royale
        </label>
        <label for="lifeSimulation" class="games-label">
          <input type="checkbox" id="lifeSimulation" v-model="selectedCategories.LifeSimulation.selected" />
          Life Simulation
        </label>
        <label for="actionAdventure" class="games-label">
          <input type="checkbox" id="actionAdventure" v-model="selectedCategories.ActionAdventure.selected" />
          Action-adventure
        </label>
        <label for="rpg" class="games-label">
          <input type="checkbox" id="rpg" v-model="selectedCategories.RPG.selected" />
          Role-playing game
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState, mapActions } from 'vuex';

interface SelectedCategories {
  [key: string]: {
    value: string;
    selected: boolean;
  };
}

export default {
  data() {
    return {
      priceFrom: 0,
      isChecked: true,
      selectedCategories: {
        All: { value: '59fa4bdf-195e-4c48-930b-df4ae9429534', selected: true },
        Merch: { value: '0b7fcf32-3835-4e41-8f49-b2d70f0e997d', selected: true },
        Games: { value: '59fa4bdf-195e-4c48-930b-df4ae9429534', selected: true },
        MOBA: { value: '78c0393f-9fc6-4744-96ef-faf666f9102f', selected: true },
        Shooter: { value: 'b222a2a4-da7e-4088-ab08-57700b9327df', selected: true },
        BattleRoyale: { value: '4c6abd1a-f6fc-4aa5-a271-7cb5ff2e4228', selected: true },
        LifeSimulation: { value: '2be077db-42bc-4b9d-aa6d-a62bcfa11d85', selected: true },
        RPG: { value: '0be1c5d8-7680-4426-96d5-26a6989dd9b4', selected: true },
        ActionAdventure: { value: '5402faca-17a1-4830-b92c-292c16d1568d', selected: true },
      } as SelectedCategories,
    };
  },
  computed: {
    ...mapState(['priceRange']),

    priceRange(): number {
      return this.$store.state.products.priceRange;
    },
  },
  methods: {
    ...mapMutations(['updatePriceRange']),
    ...mapActions(['fetchProducts']),
    updatePriceRange(event: Event | null) {
      if (event && event.target instanceof HTMLInputElement) {
        const newPriceRange = parseFloat(event.target.value);

        this.$store.commit('updatePriceRange', newPriceRange);
      }
    },
    handleProductChange() {
      if (this.selectedCategories.Merch.selected && this.selectedCategories.Games.selected) {
        this.selectedCategories.All.selected = true;
      } else {
        this.selectedCategories.All.selected = false;
      }

      if (this.selectedCategories.Games.selected) {
        for (const category in this.selectedCategories) {
          if (category !== 'All' && category !== 'Games' && category !== 'Merch') {
            this.selectedCategories[category as keyof typeof this.selectedCategories].selected = true;
          }
        }
      } else {
        for (const category in this.selectedCategories) {
          if (category !== 'All' && category !== 'Games' && category !== 'Merch') {
            this.selectedCategories[category as keyof typeof this.selectedCategories].selected = false;
          }
        }
      }

      this.$store.commit('updateSelectedGameCategories', this.selectedCategories);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';
.filter-bar {
  width: 90%;
  padding: 15px;
  border: 2px solid rgba(30, 28, 39, 1);
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  font-family: $manrope-font-family;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;

  h2 {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .price-filter {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; /* Используем flex-контейнер для выравнивания элементов */
    justify-content: space-between;

    .price-range {
      display: flex; /* Используем flex-контейнер для размещения "от" и числа на одной строке */
      align-items: center;
    }

    .price-range_label {
      display: flex;
      width: 90%;
      justify-content: space-between;
      align-items: center;
      margin: auto;
    }

    .custom-price-range {
      width: 90%;
      height: 2px; /* Увеличил высоту ползунка */
      background-color: #fff;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
      border: none;
      margin: 0.4rem;
      /* Сдвиг ползунка вверх, чтобы он находился на линии */
    }

    .custom-price-range::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      background-color: rgba(119, 190, 29, 1);
      cursor: pointer;
      border-radius: 50%;
      border: none;
      margin-top: -8px; /* Сдвиг ползунка вверх */
    }

    .custom-price-range::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: rgba(119, 190, 29, 1);
      cursor: pointer;
      border-radius: 50%;
      border: none;
      margin-top: -8px; /* Сдвиг ползунка вверх */
    }

    /* Добавляем стили при фокусе на элементе */
    .custom-price-range:focus {
      opacity: 1;
      outline: none;
    }

    /* Стили для ползунка в неактивном состоянии */
    .custom-price-range:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    /* Стили для заполненной части полоски слева от ползунка */
    .custom-price-range::-webkit-slider-runnable-track {
      width: 100%;
      height: 1px;
      background: #fff;
    }

    .custom-price-range::-moz-range-track {
      width: 100%;
      height: 1px;
      background: #fff;
    }
  }
}

.category-item {
  margin-bottom: 5px;
  padding: 5px;
}
.category-filter {
  label {
    display: block;
    margin-bottom: 5px;
    position: relative;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.games-label {
  padding-left: 25px;
}
</style>
