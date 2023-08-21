<template>
  <base-auth-wrapper>
    <form @submit.prevent="submitHandler">
      <transition mode="out-in" :name="transitionName">
        <div class="form-wrapper" v-if="activePhase === 1">
          <div class="form-control">
            <!-- THIS IS EXAMPLE - `@click="sendRuslanData` -->
            <label for="firstName" @click="sendRuslanData"><strong>First name</strong> </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              v-model.trim="formData.firstName"
              @blur="v$.firstName.$validate"
              :class="{
                error:
                  (v$.firstName.$dirty && v$.firstName.required.$invalid) ||
                  (v$.firstName.$dirty && v$.firstName.validateFirstName.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.firstName.$dirty && v$.firstName.validateFirstName.$invalid">
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
          <div class="form-control">
            <label for="lastName"><strong>Last name</strong></label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              v-model.trim="formData.lastName"
              @blur="v$.lastName.$validate"
              :class="{
                error:
                  (v$.lastName.$dirty && v$.lastName.required.$invalid) ||
                  (v$.lastName.$dirty && v$.lastName.validateLastName.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.lastName.$dirty && v$.lastName.validateLastName.$invalid">
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model.trim="formData.email"
              @blur="v$.email.$validate"
              :class="{
                error: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.email.$dirty && v$.email.required.$invalid">
              <div class="error-msg">Email can't be empty</div>
            </div>
            <div class="input-errors" v-else-if="v$.email.$dirty && v$.email.email.$invalid">
              <div class="error-msg">Enter valid email address</div>
            </div>
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model.trim="formData.password"
              @blur="v$.password.$validate"
              :class="{
                error:
                  (v$.password.$dirty && v$.password.required.$invalid) ||
                  (v$.password.$dirty && v$.password.validatePassword.$invalid),
              }"
            />
            <div class="input-errors" v-if="v$.password.$dirty && v$.password.required.$invalid">
              <div class="error-msg">Enter password</div>
            </div>
            <div class="input-errors" v-else-if="v$.password.$dirty && v$.password.validatePassword.$invalid">
              <div class="error-msg">
                Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1
                number.
              </div>
            </div>
          </div>
          <div class="form-control">
            <label for="date">Date of birth</label>
            <input
              id="date"
              type="text"
              v-model.trim="formData.date"
              placeholder="dd/mm/year"
              maxlength="10"
              minlength="10"
              inputmode="numeric"
              @blur="v$.date.$validate"
              :class="{
                error:
                  (v$.date.$dirty && v$.date.required.$invalid) ||
                  (v$.date.$dirty && v$.date.minLength.$invalid) ||
                  (isValidAge.age ? v$.date.$dirty && !isValidAge.isTrue : false) ||
                  (isValidAge.age ? v$.date.$dirty && !isValidAge.isTrue : false),
              }"
            />
            <div class="input-errors" v-if="v$.date.$dirty && v$.date.required.$invalid">
              <div class="error-msg">Enter date of birth</div>
            </div>
            <div class="input-errors" v-else-if="v$.date.$dirty && v$.date.minLength.$invalid">
              <div class="error-msg">Enter a valid date in the format DD/MM/YYYY"</div>
            </div>
            <div
              class="input-errors"
              v-else-if="isValidAge.age && isValidAge.age > 0 ? v$.date.$dirty && !isValidAge.isTrue : false"
            >
              <div class="error-msg">Age is below the allowed limit({{ minAge }}). You'r {{ isValidAge.age }} now</div>
            </div>
            <div class="input-errors" v-else-if="v$.date.$dirty && !isValidAge.isTrue">
              <div class="error-msg">Birth date cannot be in the future. Enter a valid date</div>
            </div>
          </div>
        </div>
        <div class="form-wrapper-step2" v-else>
          <VHeader />
          <div class="form-wrapper">
            <label>Street</label>
            <div class="form-control">
              <div>
                <input
                  id="street"
                  type="text"
                  placeholder="Enter your street"
                  v-model.trim="formData.billingAddress.street"
                  @blur="v$.billingAddress.street.$validate"
                  :class="{ error: v$.billingAddress.street.$dirty && v$.billingAddress.street.required.$invalid }"
                />
                <div
                  class="input-errors"
                  v-if="v$.billingAddress.street.$dirty && v$.billingAddress.street.required.$invalid"
                >
                  <div class="error-msg">Must contain at least one character</div>
                </div>
              </div>
              <div>
                <input
                  id="street"
                  type="text"
                  placeholder="Enter your street"
                  v-model.trim="formData.shippingAddress.street"
                  @blur="v$.shippingAddress.street.$validate"
                  :disabled="checkGroup.isCheckboxTrue"
                  :class="{
                    error:
                      v$.shippingAddress.street.$dirty &&
                      v$.shippingAddress.street.required.$invalid &&
                      !checkGroup.isCheckboxTrue,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="
                    v$.shippingAddress.street.$dirty &&
                    v$.shippingAddress.street.required.$invalid &&
                    !checkGroup.isCheckboxTrue
                  "
                >
                  <div class="error-msg">Must contain at least one character</div>
                </div>
              </div>
            </div>
            <label>City</label>
            <div class="form-control">
              <div>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  v-model.trim="formData.billingAddress.city"
                  @blur="v$.billingAddress.city.$validate"
                  :class="{
                    error: v$.billingAddress.city.$dirty && v$.billingAddress.city.validateCity.$invalid,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.billingAddress.city.$dirty && v$.billingAddress.city.validateCity.$invalid"
                >
                  <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
                </div>
              </div>
              <div>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  v-model.trim="formData.shippingAddress.city"
                  @blur="v$.shippingAddress.city.$validate"
                  :disabled="checkGroup.isCheckboxTrue"
                  :class="{
                    error: v$.shippingAddress.city.$dirty && v$.shippingAddress.city.validateCity.$invalid,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.shippingAddress.city.$dirty && v$.shippingAddress.city.validateCity.$invalid"
                >
                  <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
                </div>
              </div>
            </div>
            <label>Country</label>
            <div class="form-control">
              <div>
                <vSelect
                  :countries="countries"
                  :selected="selectedCountry.billingCountry"
                  @select="setBillingCountry"
                  @blur="v$.billingAddress.country.$validate"
                  :class="{
                    error: v$.billingAddress.country.$dirty && v$.billingAddress.country.required.$invalid,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.billingAddress.country.$dirty && v$.billingAddress.country.required.$invalid"
                >
                  <div class="error-msg">Must be a valid country from a predefined list</div>
                </div>
              </div>
              <div>
                <vSelect
                  :countries="countries"
                  :selected="selectedCountry.shippingCountry"
                  @select="setShippingCountry"
                  @blur="v$.shippingAddress.country.$validate"
                  :class="{
                    error: v$.shippingAddress.country.$dirty && v$.shippingAddress.country.required.$invalid,
                    disabled: checkGroup.isCheckboxTrue,
                  }"
                />
                <div
                  class="input-errors"
                  v-if="v$.shippingAddress.country.$dirty && v$.shippingAddress.country.required.$invalid"
                >
                  <div class="error-msg">Must be a valid country from a predefined list</div>
                </div>
              </div>
            </div>
            <label>Phone number</label>
            <div class="form-control">
              <div>
                <input
                  id="tel"
                  type="text"
                  inputmode="tel"
                  :maxlength="v$.billingAddress.phoneNumber.minLength.$params.min"
                  :placeholder="placeholders.phoneNumberBillingPlaceholder"
                  v-model="formData.billingAddress.phoneNumber"
                  @blur="v$.billingAddress.phoneNumber.$validate"
                  :class="{
                    error:
                      (v$.billingAddress.phoneNumber.$dirty && v$.billingAddress.phoneNumber.required.$invalid) ||
                      (v$.billingAddress.phoneNumber.$dirty && v$.billingAddress.phoneNumber.minLength.$invalid),

                    disabled: selectedCountry.billingCountry.value === 'Select country',
                  }"
                  :disabled="selectedCountry.billingCountry.value === 'Select country'"
                />
                <div
                  class="input-errors"
                  v-if="v$.billingAddress.phoneNumber.$dirty && v$.billingAddress.phoneNumber.required.$invalid"
                >
                  <div class="error-msg">Enter your phone number</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="v$.billingAddress.phoneNumber.$dirty && v$.billingAddress.phoneNumber.minLength.$invalid"
                >
                  <div class="error-msg">Enter a valid phone number</div>
                </div>
              </div>
              <div>
                <input
                  id="tel"
                  type="text"
                  inputmode="tel"
                  :maxlength="v$.shippingAddress.phoneNumber.minLength.$params.min"
                  :placeholder="placeholders.phoneNumberShippingPlaceholder"
                  v-model="formData.shippingAddress.phoneNumber"
                  @blur="v$.shippingAddress.phoneNumber.$validate"
                  :class="{
                    error:
                      (v$.shippingAddress.phoneNumber.$dirty && v$.shippingAddress.phoneNumber.required.$invalid) ||
                      (v$.shippingAddress.phoneNumber.$dirty && v$.shippingAddress.phoneNumber.minLength.$invalid),

                    disabled: selectedCountry.shippingCountry.value === 'Select country' || checkGroup.isCheckboxTrue,
                  }"
                  :disabled="selectedCountry.shippingCountry.value === 'Select country' || checkGroup.isCheckboxTrue"
                />
                <div
                  class="input-errors"
                  v-if="v$.shippingAddress.phoneNumber.$dirty && v$.shippingAddress.phoneNumber.required.$invalid"
                >
                  <div class="error-msg">Enter your phone number</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="v$.shippingAddress.phoneNumber.$dirty && v$.shippingAddress.phoneNumber.minLength.$invalid"
                >
                  <div class="error-msg">Enter a valid phone number</div>
                </div>
              </div>
            </div>
            <label for="postalCode">Postal code</label>
            <div class="form-control">
              <div>
                <input
                  id="postalCode"
                  type="text"
                  v-model.trim="formData.billingAddress.postalCode"
                  @blur="v$.billingAddress.postalCode.$validate"
                  :class="{
                    error:
                      (v$.billingAddress.postalCode.$dirty && v$.billingAddress.postalCode.required.$invalid) ||
                      (v$.billingAddress.postalCode.$dirty &&
                        v$.billingAddress.postalCode.validateBillingPostalCode.$invalid),
                    disabled: selectedCountry.billingCountry.value === 'Select country',
                  }"
                  :disabled="selectedCountry.billingCountry.value === 'Select country'"
                  :placeholder="placeholders.postalCodeBillingPlaceholder"
                />
                <div
                  class="input-errors"
                  v-if="v$.billingAddress.postalCode.$dirty && v$.billingAddress.postalCode.required.$invalid"
                >
                  <div class="error-msg">Enter your postal code</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="
                    v$.billingAddress.postalCode.$dirty &&
                    v$.billingAddress.postalCode.validateBillingPostalCode.$invalid
                  "
                >
                  <div class="error-msg">Must follow the format for the country</div>
                </div>
              </div>
              <div>
                <input
                  id="postalCode"
                  type="text"
                  v-model.trim="formData.shippingAddress.postalCode"
                  @blur="v$.shippingAddress.postalCode.$validate"
                  :class="{
                    error:
                      (v$.shippingAddress.postalCode.$dirty && v$.shippingAddress.postalCode.required.$invalid) ||
                      (v$.shippingAddress.postalCode.$dirty &&
                        v$.shippingAddress.postalCode.validateShippingPostalCode.$invalid),
                    disabled: selectedCountry.shippingCountry.value === 'Select country' || checkGroup.isCheckboxTrue,
                  }"
                  :disabled="selectedCountry.shippingCountry.value === 'Select country' || checkGroup.isCheckboxTrue"
                  :placeholder="placeholders.postalCodeShippingPlaceholder"
                />
                <div
                  class="input-errors"
                  v-if="v$.shippingAddress.postalCode.$dirty && v$.shippingAddress.postalCode.required.$invalid"
                >
                  <div class="error-msg">Enter your postal code</div>
                </div>
                <div
                  class="input-errors"
                  v-else-if="
                    v$.shippingAddress.postalCode.$dirty &&
                    v$.shippingAddress.postalCode.validateShippingPostalCode.$invalid
                  "
                >
                  <div class="error-msg">Must follow the format for the country</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <VCheckbox v-model="checkGroup.isCheckboxTrue" />
      <VRadioButtons :isBothAddressChecked="checkGroup.isCheckboxTrue" />
      <base-auth-button v-if="!isLastPage" @click.prevent="goToStep(2, 'next')" mode="true">continue</base-auth-button>
      <div class="button-wrapper" v-else>
        <base-auth-button @click="goToStep(1, 'back')">back</base-auth-button>
        <base-auth-button>submit</base-auth-button>
        <span class="underline"></span>
      </div>
    </form>
    <HaveAnAccountForm mode="signup" />
  </base-auth-wrapper>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import HaveAnAccountForm from '@/components/auth/registration/HaveAnAccountForm.vue';
import VCheckbox from '@/components/auth/registration/AddressCheckbox.vue';
import VHeader from '@/components/auth/registration/HeaderSecondStep.vue';
import VRadioButtons from '@/components/auth/registration/AddressRadioButtons.vue';
import vSelect from '@/components/auth/registration/SelectForm.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { RegisterData } from '@/types/auth/RegisterData';
import { Country } from '@/types/auth/SelectFormCountry';
import { calculateAge } from '@/utils/auth/calculateAge';
import {
  validateLastName,
  validatePassword,
  validateFirstName,
  formatDate,
  validateCity,
  validateCountry,
  formatPhoneNumber,
} from '@/utils/auth/validator';

const activePhase: Ref<number> = ref(2);
const transitionName: Ref<string> = ref('');
const minAge: Ref<number> = ref(13);
const checkGroup = reactive({
  isCheckboxTrue: true,
});
const isValidAge: Ref<{ isTrue: boolean; age: number | null }> = ref({ isTrue: false, age: null });
const placeholders = reactive({
  postalCodeBillingPlaceholder: 'Select country',
  phoneNumberBillingPlaceholder: 'Select country',
  postalCodeShippingPlaceholder: 'Select country',
  phoneNumberShippingPlaceholder: 'Select country',
});

const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'USA', value: 'The United States' },
]);

const selectedCountry = reactive({
  billingCountry: { title: '', value: 'Select country' },
  shippingCountry: { title: '', value: 'Select country' },
});
// THIS IS NEED
const store = useStore();
// THIS IS EXAMPLE
const ruslanData = {
  body: {
    email: 'krutoi-front@gmail.com',
    password: '123a456AB!',
    firstName: 'Ruslan',
    lastName: 'KrutoiFrontDev',
    dateOfBirth: '2008-12-31',
    addresses: [
      {
        country: 'RU',
        city: 'Astrakhani',
        streetName: 'Mira',
        postalCode: '414000',
        phone: '+7(969)969-69-69',
      },
      {
        country: 'US',
        city: 'California',
        streetName: 'Rodeo Drive',
        postalCode: '89061',
        phone: '+7(777)777-77-77',
      },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
  },
};

// THIS IS EXAMPLE
async function sendRuslanData() {
  await store.dispatch('customer/singUp', ruslanData);
}

const formData: RegisterData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  date: '',
  billingAddress: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  },
  shippingAddress: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  },
});

const rules = computed(() => {
  return {
    firstName: { required, validateFirstName },
    lastName: { required, validateLastName },
    email: { required, email },
    password: { required, validatePassword },
    date: { required, minLength: minLength(10) },
    billingAddress: {
      street: { required },
      city: { validateCity },
      postalCode: { required, validateBillingPostalCode },
      country: { required },
      phoneNumber: { required, minLength: minLength(17) },
    },
    shippingAddress: {
      street: { required },
      city: { validateCity },
      postalCode: { required, validateShippingPostalCode },
      country: { required },
      phoneNumber: { required, minLength: minLength(17) },
    },
  };
});

const v$ = useVuelidate(rules, formData);

const isLastPage = computed(() => {
  return activePhase.value === 2;
});

watch(
  () => formData.date,
  (newFormDate) => {
    formData.date = formatDate(newFormDate);

    if (!v$.value.date.minLength.$invalid) {
      isValidAge.value = calculateAge(formData.date, minAge.value);
    }
  },
);

watch(
  () => selectedCountry.billingCountry,
  (newValue) => {
    placeholders.postalCodeBillingPlaceholder = validateCountry[newValue.title].placeholder;
    placeholders.phoneNumberBillingPlaceholder = validateCountry[newValue.title].phoneMask;
    formData.billingAddress.country = newValue.value;
  },
);

watch(
  () => selectedCountry.shippingCountry,
  (newValue) => {
    if (newValue.title !== '') {
      placeholders.postalCodeShippingPlaceholder = validateCountry[newValue.title].placeholder;
      placeholders.phoneNumberShippingPlaceholder = validateCountry[newValue.title].phoneMask;
      formData.shippingAddress.country = newValue.value;
    }
  },
);

watch(
  () => formData.billingAddress.phoneNumber,
  (newValue) => {
    formData.billingAddress.phoneNumber = formatPhoneNumber(newValue, selectedCountry.billingCountry.title);
  },
);

watch(
  () => formData.shippingAddress.phoneNumber,
  (newValue) => {
    formData.shippingAddress.phoneNumber = formatPhoneNumber(newValue, selectedCountry.shippingCountry.title);
  },
);

watch(
  () => checkGroup.isCheckboxTrue,
  (newValue) => {
    if (newValue === true) {
      formData.shippingAddress.street = '';
      formData.shippingAddress.city = '';
      setShippingCountry({ title: '', value: 'Select country' });
      v$.value.shippingAddress.$reset();
    }
  },
);

function validateBillingPostalCode(postalCode: string) {
  if (selectedCountry.billingCountry.title.toLocaleLowerCase() === 'ru') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.billingCountry.title.toLocaleLowerCase() === 'usa') {
    return /^[0-9]{5}$/.test(postalCode);
  }

  return false;
}

function validateShippingPostalCode(postalCode: string) {
  if (selectedCountry.shippingCountry.title.toLocaleLowerCase() === 'ru') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.shippingCountry.title.toLocaleLowerCase() === 'usa') {
    return /^[0-9]{5}$/.test(postalCode);
  }

  return false;
}

function goToStep(value: number, transitionValue?: string) {
  if (value === 2) {
    v$.value.firstName.$validate();
    v$.value.lastName.$validate();
    v$.value.email.$validate();
    v$.value.password.$validate();
    v$.value.date.$validate();
  }

  if (v$.value.$errors.length && value !== 1) {
    return;
  }
  activePhase.value = value;

  if (transitionValue) transitionName.value = transitionValue;
}

function setBillingCountry(option: Country) {
  selectedCountry.billingCountry = option;
  formData.billingAddress.postalCode = '';
  formData.billingAddress.phoneNumber = '';
}

function setShippingCountry(option: Country) {
  selectedCountry.shippingCountry = option;
  formData.shippingAddress.postalCode = '';
  formData.shippingAddress.phoneNumber = '';
}

async function submitHandler() {
  const isFormCorrect = await v$.value.$validate();
  // you can show some extra alert to the user or just leave the each field to show it's `$errors`.

  console.log('validation signup error');

  if (!isFormCorrect) return;
  // actually submit form
}
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;
.button-wrapper {
  display: flex;
  position: relative;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  @media (max-width: 1200px) {
    max-width: calc(85% + 15 * ((100vw - 320px) / (1200 - 320)));
  }
  & .underline {
    position: absolute;
    display: block;
  }
  & .underline:nth-child(3) {
    bottom: 2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $mainWhiteColor);
    animation: btn-anim1 3s linear infinite;
  }
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  & .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    @media (max-width: 1200px) {
      gap: calc(10px + 10 * ((100vw - 320px) / (1200 - 320)));
    }
    & .form-control {
      display: flex;
      flex-direction: column;
      gap: 10px;
      & div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }
      & .input-errors {
        & .error-msg {
          color: $errorColor;
          text-align: left;
          font-size: 13px;
          @media (max-width: 1200px) {
            font-size: calc(10px + 3 * ((100vw - 320px) / (1200 - 320)));
          }
        }
      }
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
  & .form-wrapper-step2 {
    display: flex;
    flex-direction: column;
    & .form-control {
      flex-direction: row;
    }
    & label {
      color: $mainWhiteColor;
      opacity: 0.8;
      white-space: nowrap;
      font-size: 16px;
      @media (max-width: 1200px) {
        font-size: calc(13px + 3 * ((100vw - 320px) / (1200 - 320)));
      }
    }
  }
}

.back-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.next-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.next-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.back-enter-active,
.next-enter-active {
  transition: all 1s ease-out;
}
.back-leave-active,
.next-leave-active {
  transition: all 1s ease-in;
}

.back-enter-to,
.back-leave-from,
.next-enter-to,
.next-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}
</style>
