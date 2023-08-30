<template>
  <div class="user__wrapper">
    <h1>Settings</h1>
    <div class="user__settings">
      <base-card>
        <profile-settings />
      </base-card>
      <base-card>
        <profile-info />
      </base-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSettings from '@/components/user-page/ProfileSettings.vue';
import ProfileInfo from '@/components/user-page/ProfileInfo.vue';
</script>

<style lang="scss" scoped>
$mainTextColor: #fefefecc;
.user {
  &__wrapper {
    padding: 50px;
    color: $mainTextColor;
    @media (max-width: 1200px) {
      padding: calc(15px + (50 - 15) * ((100vw - 320px) / (1200 - 320)));
    }
    h1 {
      font-size: 30px;
      @media (max-width: 1200px) {
        font-size: calc(15px + (30 - 15) * ((100vw - 320px) / (1200 - 320)));
      }
      text-align: left;
    }
  }
  &__settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
}
</style>
