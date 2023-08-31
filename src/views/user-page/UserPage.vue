<template>
  <div class="user__wrapper">
    <div class="user__header">
      <h1 class="user__settings-header">Settings</h1>
      <burger-menu @set-option="setProfileOption"></burger-menu>
    </div>
    <div class="user__settings">
      <base-card class="user__profile">
        <profile-settings @set-option="setProfileOption" />
      </base-card>
      <base-card class="user__info">
        <transition mode="out-in">
          <keep-alive>
            <component :is="tab"></component>
          </keep-alive>
        </transition>
      </base-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSettings from '@/components/user-page/ProfileSettings.vue';
import ProfileInfo from '@/components/user-page/ProfileInfo.vue';
import BillingAddress from '@/components/user-page/BillingAddress.vue';
import ShippingAddress from '@/components/user-page/ShippingAddress.vue';
import BurgerMenu from '@/components/user-page/BurgerMenu.vue';
import { ref, markRaw } from 'vue';

let tab = ref(markRaw(ProfileInfo));
let profileHeader = ref('');

function setProfileOption(option: string) {
  profileHeader.value = option;

  if (option === 'Account') {
    tab.value = markRaw(ProfileInfo);
  } else if (option === 'Billing address') {
    tab.value = markRaw(BillingAddress);
  } else if (option === 'Shipping address') {
    tab.value = markRaw(ShippingAddress);
  }
}
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
