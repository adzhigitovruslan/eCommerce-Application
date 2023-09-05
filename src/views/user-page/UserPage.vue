<template>
  <div class="user__wrapper">
    <div class="user__header">
      <h1 class="user__settings-header">User Profile</h1>
      <burger-menu @set-option="setProfileOption"></burger-menu>
    </div>
    <div class="user__settings">
      <base-card class="user__profile">
        <profile-settings @set-option="setProfileOption" />
      </base-card>
      <transition mode="out-in">
        <div class="user__info-wrapper" v-if="profileHeader === 'Account' && !isLoading">
          <base-card class="user__info">
            <ProfileInfo />
          </base-card>
        </div>
        <div class="user__info-wrapper" v-else-if="profileHeader === 'Address' && !isLoading">
          <base-card class="user__info" v-for="address in getUser.address" :key="address.id">
            <AddressCard :address="address" :version="getVersion" />
          </base-card>
        </div>
        <div class="user__info-wrapper" v-else>
          <base-card class="user__info">
            <base-spinner title="loading"></base-spinner>
          </base-card>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSettings from '@/components/user-page/ProfileSettings.vue';
import ProfileInfo from '@/components/user-page/ProfileInfo.vue';
import AddressCard from '@/components/user-page/AddressCard.vue';
import BurgerMenu from '@/components/user-page/BurgerMenu.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let profileHeader = ref('Account');
const isLoading = ref(false);
const getUser = computed(() => store.getters['customer/getUser']);
const getVersion = computed(() => store.getters['customer/getVersion']);

function setProfileOption(option: string) {
  profileHeader.value = option;
}

async function getCustomerData() {
  try {
    isLoading.value = true;
    await store.dispatch('customer/getCustomer');
    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}
getCustomerData();
</script>

<style lang="scss" scoped>
$mainTextColor: #fefefecc;
.user {
  &__wrapper {
    padding: 50px;
    color: $mainTextColor;
    @media (max-width: 600px) {
      padding: calc(15px + (50 - 15) * ((100vw - 320px) / (600 - 320)));
    }
    &__settings-header {
      font-size: 30px;
      @media (max-width: 600px) {
        font-size: calc(16px + (30 - 16) * ((100vw - 320px) / (600 - 320)));
      }
      text-align: left;
    }
  }
  &__settings {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
  &__profile {
    max-width: 300px;
    width: 100%;
    background: #1c1c1c;
    @media (max-width: 600px) {
      display: none;
    }
  }
  &__info {
    width: 100%;
    background: #1c1c1c;
    &-wrapper {
      width: 100%;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.v-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}
</style>
