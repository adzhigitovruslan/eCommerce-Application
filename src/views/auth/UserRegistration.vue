<template>
  <base-auth-wrapper>
    <form @submit.prevent="submitHandler">
      <transition mode="out-in" :name="transitionName">
        <div class="form-wrapper" v-if="activePhase === 1">
          <div class="form-control">
            <label for="firstName"><strong>First name</strong> </label>
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
          <div class="form-wrapper">
            <div class="form-control">
              <label for="street">Street</label>
              <input
                id="street"
                type="text"
                placeholder="Enter your street"
                v-model.trim="formData.address.street"
                @blur="v$.address.street.$validate"
                :class="{ error: v$.address.street.$dirty && v$.address.street.required.$invalid }"
              />
              <div class="input-errors" v-if="v$.address.street.$dirty && v$.address.street.required.$invalid">
                <div class="error-msg">Must contain at least one character</div>
              </div>
            </div>
            <div class="form-control">
              <label for="street">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                v-model.trim="formData.address.city"
                @blur="v$.address.city.$validate"
                :class="{
                  error: v$.address.city.$dirty && v$.address.city.validateCity.$invalid,
                }"
              />
              <div class="input-errors" v-if="v$.address.city.$dirty && v$.address.city.validateCity.$invalid">
                <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
              </div>
            </div>
            <div class="form-control">
              <label for="country">Country</label>
              <vSelect
                :countries="countries"
                :selected="selectedCountry"
                @select="setSelectedCountry"
                @blur="v$.address.country.$validate"
                :class="{
                  error: v$.address.country.$dirty && v$.address.country.required.$invalid,
                }"
              />
              <div class="input-errors" v-if="v$.address.country.$dirty && v$.address.country.required.$invalid">
                <div class="error-msg">Must be a valid country from a predefined list</div>
              </div>
            </div>
            <div class="form-control">
              <label for="tel">Phone number</label>
              <input
                id="tel"
                type="text"
                inputmode="tel"
                :maxlength="v$.address.phoneNumber.minLength.$params.min"
                :placeholder="phoneNumberPlaceholder"
                v-model="formData.address.phoneNumber"
                @input="updateValue('phoneInput')"
                @blur="v$.address.phoneNumber.$validate"
                :class="{
                  error:
                    (v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid) ||
                    (v$.address.phoneNumber.$dirty && v$.address.phoneNumber.minLength.$invalid),

                  disabled: selectedCountry.value === 'Select your country',
                }"
                :disabled="selectedCountry.value === 'Select your country'"
              />
              <div
                class="input-errors"
                v-if="v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid"
              >
                <div class="error-msg">Enter your phone number</div>
              </div>
              <div
                class="input-errors"
                v-else-if="v$.address.phoneNumber.$dirty && v$.address.phoneNumber.minLength.$invalid"
              >
                <div class="error-msg">Enter a valid phone number</div>
              </div>
            </div>
            <div class="form-control">
              <label for="postalCode">Postal code</label>
              <input
                id="postalCode"
                type="text"
                v-model.trim="formData.address.postalCode"
                @blur="v$.address.postalCode.$validate"
                :class="{
                  error:
                    (v$.address.postalCode.$dirty && v$.address.postalCode.required.$invalid) ||
                    (v$.address.postalCode.$dirty && v$.address.postalCode.validatePostalCode.$invalid),
                  disabled: selectedCountry.value === 'Select your country',
                }"
                :disabled="selectedCountry.value === 'Select your country'"
                :placeholder="postalCodePlaceholder"
              />
              <div class="input-errors" v-if="v$.address.postalCode.$dirty && v$.address.postalCode.required.$invalid">
                <div class="error-msg">Enter your postal code</div>
              </div>
              <div
                class="input-errors"
                v-else-if="v$.address.postalCode.$dirty && v$.address.postalCode.validatePostalCode.$invalid"
              >
                <div class="error-msg">Must follow the format for the country</div>
              </div>
            </div>
          </div>
          <div class="form-wrapper">
            <div class="form-control">
              <label for="street">Street</label>
              <input
                id="street"
                type="text"
                placeholder="Enter your street"
                v-model.trim="formData.address.street"
                @blur="v$.address.street.$validate"
                :class="{ error: v$.address.street.$dirty && v$.address.street.required.$invalid }"
              />
              <div class="input-errors" v-if="v$.address.street.$dirty && v$.address.street.required.$invalid">
                <div class="error-msg">Must contain at least one character</div>
              </div>
            </div>
            <div class="form-control">
              <label for="street">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                v-model.trim="formData.address.city"
                @blur="v$.address.city.$validate"
                :class="{
                  error: v$.address.city.$dirty && v$.address.city.validateCity.$invalid,
                }"
              />
              <div class="input-errors" v-if="v$.address.city.$dirty && v$.address.city.validateCity.$invalid">
                <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
              </div>
            </div>
            <div class="form-control">
              <label for="country">Country</label>
              <vSelect
                :countries="countries"
                :selected="selectedCountry"
                @select="setSelectedCountry"
                @blur="v$.address.country.$validate"
                :class="{
                  error: v$.address.country.$dirty && v$.address.country.required.$invalid,
                }"
              />
              <div class="input-errors" v-if="v$.address.country.$dirty && v$.address.country.required.$invalid">
                <div class="error-msg">Must be a valid country from a predefined list</div>
              </div>
            </div>
            <div class="form-control">
              <label for="tel">Phone number</label>
              <input
                id="tel"
                type="text"
                inputmode="tel"
                :maxlength="v$.address.phoneNumber.minLength.$params.min"
                :placeholder="phoneNumberPlaceholder"
                v-model="formData.address.phoneNumber"
                @input="updateValue('phoneInput')"
                @blur="v$.address.phoneNumber.$validate"
                :class="{
                  error:
                    (v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid) ||
                    (v$.address.phoneNumber.$dirty && v$.address.phoneNumber.minLength.$invalid),

                  disabled: selectedCountry.value === 'Select your country',
                }"
                :disabled="selectedCountry.value === 'Select your country'"
              />
              <div
                class="input-errors"
                v-if="v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid"
              >
                <div class="error-msg">Enter your phone number</div>
              </div>
              <div
                class="input-errors"
                v-else-if="v$.address.phoneNumber.$dirty && v$.address.phoneNumber.minLength.$invalid"
              >
                <div class="error-msg">Enter a valid phone number</div>
              </div>
            </div>
            <div class="form-control">
              <label for="postalCode">Postal code</label>
              <input
                id="postalCode"
                type="text"
                v-model.trim="formData.address.postalCode"
                @blur="v$.address.postalCode.$validate"
                :class="{
                  error:
                    (v$.address.postalCode.$dirty && v$.address.postalCode.required.$invalid) ||
                    (v$.address.postalCode.$dirty && v$.address.postalCode.validatePostalCode.$invalid),
                  disabled: selectedCountry.value === 'Select your country',
                }"
                :disabled="selectedCountry.value === 'Select your country'"
                :placeholder="postalCodePlaceholder"
              />
              <div class="input-errors" v-if="v$.address.postalCode.$dirty && v$.address.postalCode.required.$invalid">
                <div class="error-msg">Enter your postal code</div>
              </div>
              <div
                class="input-errors"
                v-else-if="v$.address.postalCode.$dirty && v$.address.postalCode.validatePostalCode.$invalid"
              >
                <div class="error-msg">Must follow the format for the country</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
import { reactive, ref, Ref, computed, onMounted, watch } from 'vue';
import { calculateAge } from '@/utils/auth/calculateAge';
import HaveAnAccountForm from '@/components/auth/HaveAnAccountForm.vue';
import { Country } from '@/types/auth/SelectFormCountry';
import {
  validateLastName,
  validatePassword,
  validateFirstName,
  formatDate,
  validateCity,
  validateCountry,
  formatPhoneNumber,
} from '@/utils/auth/validator';
import { useVuelidate } from '@vuelidate/core';
import vSelect from '@/components/auth/SelectForm.vue';
import { required, email, minLength } from '@vuelidate/validators';
import { DataForm } from '@/types/auth/FormData';

const activePhase: Ref<number> = ref(2);
const transitionName: Ref<string> = ref('');
const minAge: Ref<number> = ref(13);
const isValidAge: Ref<{ isTrue: boolean; age: number | null }> = ref({ isTrue: false, age: null });
const isPostalCodeValid: Ref<boolean> = ref(false);
const postalCodePlaceholder: Ref<string> = ref('Select country first');
const phoneNumberPlaceholder: Ref<string> = ref('Select country first');
const countries = ref([
  { title: 'RU', value: 'Russian Federation' },
  { title: 'USA', value: 'The United States' },
]);
const selectedCountry: Ref<Country> = ref({ title: '', value: 'Select your country' });
let tabs: Ref<number | undefined> = ref();

const formData: DataForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  date: '',
  address: {
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
    address: {
      street: { required },
      city: { validateCity },
      postalCode: { required, validatePostalCode },
      country: { required },
      phoneNumber: { required, minLength: minLength(17) },
    },
  };
});

const v$ = useVuelidate(rules, formData);

const isLastPage = computed(() => {
  if (tabs.value) {
    return activePhase.value === 2;
  }

  return false;
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
  () => formData.address.postalCode,
  (newFormPostaCode) => {
    console.log(isPostalCodeValid.value);
    isPostalCodeValid.value = validateCountry[selectedCountry.value.title].validator(newFormPostaCode);
  },
);

watch(selectedCountry, (newValue) => {
  postalCodePlaceholder.value = validateCountry[newValue.title].placeholder;
  phoneNumberPlaceholder.value = validateCountry[newValue.title].phoneMask;
  formData.address.country = newValue.value;
});

function updateValue(type: string) {
  if (type === 'phoneInput') {
    formData.address.phoneNumber = formatPhoneNumber(formData.address.phoneNumber, selectedCountry.value.title);
  }
}

function validatePostalCode(postalCode: string) {
  if (selectedCountry.value.title.toLocaleLowerCase() === 'ru') {
    return /^[0-9]{6}$/.test(postalCode);
  } else if (selectedCountry.value.title.toLocaleLowerCase() === 'usa') {
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
function setSelectedCountry(option: Country) {
  selectedCountry.value = option;
}

const submitHandler = () => {
  v$.value.$validate();
  // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
};

onMounted(() => {
  tabs.value = document.getElementsByClassName('form-wrapper').length;
});
</script>

<style lang="scss" scoped>
$errorColor: #ff3333;
$mainWhiteColor: #fefefe;
$darkBackgroundColor: #010101;
.button-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
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
  gap: 10px;
  overflow: hidden;

  & .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & .form-control {
      display: flex;
      flex-direction: column;
      gap: 10px;
      & .input-errors {
        & .error-msg {
          color: $errorColor;
          text-align: left;
          font-size: 13px;
        }
      }
      & label {
        color: $mainWhiteColor;
        opacity: 0.8;
        white-space: nowrap;
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
