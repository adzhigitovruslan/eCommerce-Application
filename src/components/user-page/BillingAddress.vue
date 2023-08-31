<template>
  <div>
    <h1 class="profile__header">
      Billing Address
      <span v-if="isCheckboxTrue">default</span>
    </h1>

    <div class="form-wrapper">
      <label>Street</label>
      <div class="form-control">
        <div class="form-item">
          <input
            id="street"
            type="text"
            placeholder="Your street"
            :disabled="!isStreetEdit"
            :class="{ disabled: !isStreetEdit }"
          />
          <font-awesome-icon v-if="!isStreetEdit" @click="isStreetEdit = !isStreetEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="isStreetEdit = !isStreetEdit" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="isStreetEdit = !isStreetEdit" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
      <label>Country</label>
      <div class="form-control">
        <div class="form-item">
          <vSelect
            :countries="countries"
            :selected="selectedCountry"
            @select="setCountry"
            :disabled="!isSelectEdit"
            :class="{ disabled: !isSelectEdit }"
          />
          <font-awesome-icon v-if="!isSelectEdit" @click="isSelectEdit = !isSelectEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="isSelectEdit = !isSelectEdit" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="isSelectEdit = !isSelectEdit" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
      <div class="form-control">
        <label>City</label>
        <div class="form-item">
          <input
            id="city"
            type="text"
            placeholder="Your city"
            :disabled="!isCityEdit"
            :class="{ disabled: !isCityEdit }"
          />
          <font-awesome-icon v-if="!isCityEdit" @click="isCityEdit = !isCityEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="isCityEdit = !isCityEdit" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="isCityEdit = !isCityEdit" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
      <label>Phone number</label>
      <div class="form-control">
        <div class="form-item">
          <input
            id="tel"
            type="text"
            inputmode="tel"
            placeholder="Your phone number"
            :disabled="!isPhoneEdit"
            :class="{ disabled: !isPhoneEdit }"
          />
          <font-awesome-icon v-if="!isPhoneEdit" @click="isPhoneEdit = !isPhoneEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="isPhoneEdit = !isPhoneEdit" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="isPhoneEdit = !isPhoneEdit" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
      <label for="postalCode">Postal code</label>
      <div class="form-control">
        <div class="form-item">
          <input
            id="postalCode"
            type="text"
            placeholder="Your postal code"
            :disabled="!isPostalCodeEdit"
            :class="{ disabled: !isPostalCodeEdit }"
          />
          <font-awesome-icon
            v-if="!isPostalCodeEdit"
            @click="isPostalCodeEdit = !isPostalCodeEdit"
            icon="pen-to-square"
          />
          <div class="form-item" v-else>
            <font-awesome-icon @click="isPostalCodeEdit = !isPostalCodeEdit" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="isPostalCodeEdit = !isPostalCodeEdit" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
    </div>
    <VCheckbox v-model="isCheckboxTrue" label="Set as default billing address" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VCheckbox from '@/components/auth/registration/AddressCheckbox.vue';
import { Country } from '@/types/auth/SelectFormCountry';
import vSelect from '@/components/auth/registration/SelectForm.vue';

let selectedCountry = ref({ title: '', value: 'Select country' });
const isCheckboxTrue = ref(false);
const isSelectEdit = ref(false);
const isCityEdit = ref(false);
const isPostalCodeEdit = ref(false);
const isPhoneEdit = ref(false);
const isStreetEdit = ref(false);
const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'US', value: 'The United States' },
]);

function setCountry(option: Country) {
  selectedCountry.value = option;
  // formData.body.addresses[0].postalCode = '';
  // formData.body.addresses[0].phone = '';
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;

.profile {
  &__header {
    font-size: 20px;
    font-weight: 900;
    border-bottom: 1px solid #fefefecc;
    margin-bottom: 20px;
    line-height: 50px;
    transition: 0.5s ease;
    & span {
      font-size: 13px;
      background-color: green;
      color: #fefefecc;
      border-radius: 5px;
      padding: 2px;
    }
    @media (max-width: 600px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
  }
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  @media (max-width: 1200px) {
    gap: calc(10px + 10 * ((100vw - 320px) / (1200 - 320)));
  }
  & .form-item {
    display: flex;
    align-items: center;
    gap: 10px;
    & svg {
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & .form-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & label {
      color: $mainWhiteColor;
      opacity: 0.8;
      white-space: nowrap;
      font-size: 16px;
      @media (max-width: 1200px) {
        font-size: calc(13px + 3 * ((100vw - 320px) / (1200 - 320)));
      }
    }
    & input:-webkit-autofill,
    & input:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s;
    }
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    & input[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
    & input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 6px;
      font-family: inherit;
      background: $darkBackgroundColor;
      border: 1px solid #383636;
      color: $mainWhiteColor;
      font-size: 15px;
      transition: 0.2s;
      @media (max-width: 1200px) {
        padding-top: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-bottom: calc(5px + 5 * ((100vw - 320px) / (1200 - 320)));
        padding-left: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        padding-right: calc(5px + 10 * ((100vw - 320px) / (1200 - 320)));
        font-size: calc(13px + 2 * ((100vw - 320px) / (1200 - 320)));
      }
      &.disabled {
        opacity: 0.3;
        border-color: #383636;
        cursor: no-drop;
      }
      &.error {
        color: $errorColor;
        border: 1px solid $errorColor;
        background: #ffe6e6;
      }
      &::placeholder {
        opacity: 0.8;
      }
      &:focus {
        outline: none;
        border-color: $mainWhiteColor;
      }
    }
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
.default-enter-from {
  opacity: 0;
}
.default-leave-to {
  opacity: 0;
}

.default-enter-active,
.default-leave-active {
  transition: 0.2s ease;
}
</style>
