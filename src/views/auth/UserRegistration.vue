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
              :class="{
                error: v$.firstName.$dirty && v$.firstName.required.$invalid && v$.firstName.validateFirstName.$invalid,
              }"
            />
            <div
              class="input-errors"
              v-if="v$.email.$dirty && v$.firstName.required.$invalid && v$.firstName.validateFirstName.$invalid"
            >
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
              :class="{
                error: v$.lastName.$dirty && v$.lastName.required.$invalid && v$.lastName.validateLastName.$invalid,
              }"
            />
            <div
              class="input-errors"
              v-if="v$.email.$dirty && v$.lastName.required.$invalid && v$.lastName.validateLastName.$invalid"
            >
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
              :class="{
                error:
                  (v$.date.$dirty && v$.date.required.$invalid) ||
                  (v$.date.$dirty && v$.date.minLength.$invalid) ||
                  (currAge ? v$.date.$dirty && v$.date.minValue.$params.min > currAge : false) ||
                  (v$.date.$dirty && v$.date.minLength.$invalid) ||
                  (currAge ? v$.date.$dirty && currAge < 0 : false),
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
              v-else-if="currAge && currAge > 0 ? v$.date.$dirty && v$.date.minValue.$params.min > currAge : false"
            >
              <div class="error-msg">
                Age is below the allowed limit({{ v$.date.minValue.$params.min }}). You'r {{ currAge }} now
              </div>
            </div>
            <div class="input-errors" v-else-if="currAge ? v$.date.$dirty && currAge < 0 : false">
              <div class="error-msg">Birth date cannot be in the future. Enter a valid date</div>
            </div>
          </div>
        </div>
        <div class="form-wrapper" v-else>
          <div class="form-control">
            <label for="tel">Phone number</label>
            <input
              id="tel"
              type="tel"
              placeholder="Enter your phone number"
              v-model.trim="formData.address.phoneNumber"
              :class="{ error: v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid }"
            />
            <div class="input-errors" v-if="v$.address.phoneNumber.$dirty && v$.address.phoneNumber.required.$invalid">
              <div class="error-msg">Enter a phone number</div>
            </div>
          </div>
          <div class="form-control">
            <label for="street">Street</label>
            <input
              id="street"
              type="text"
              placeholder="Enter your street"
              v-model.trim="formData.address.street"
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
              :class="{
                error:
                  v$.address.city.$dirty && v$.address.city.required.$invalid && v$.address.city.validateCity.$invalid,
              }"
            />
            <div
              class="input-errors"
              v-if="
                v$.address.city.$dirty && v$.address.city.required.$invalid && v$.address.city.validateCity.$invalid
              "
            >
              <div class="error-msg">Must contain at least one character and no special characters or numbers</div>
            </div>
          </div>
          <div class="form-control">
            <label for="postalCode">Postal code</label>
            <input
              id="postalCode"
              type="text"
              placeholder="Enter your postal code"
              v-model.trim="formData.address.postalCode"
              :class="{ error: v$.address.postalCode.$dirty && v$.address.postalCode.required.$invalid }"
            />
            <div class="input-errors" v-for="error of v$.address.postalCode.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control">
            <label for="street">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Enter your country"
              v-model.trim="formData.address.country"
              :class="{ error: v$.address.country.$dirty && v$.address.country.required.$invalid }"
            />
            <div class="input-errors" v-for="error of v$.address.country.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
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
  </base-auth-wrapper>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, onMounted, watch } from 'vue';
import { calculateAge } from '@/utils/calculateAge';
import { validateCity } from '@/utils/validateCity';
import { validateDate } from '@/utils/validateDate';
import { validateFirstName } from '@/utils/validateFirstName';
import { validateLastName } from '@/utils/validateLastName';
import { validatePassword } from '@/utils/validatePassword';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, minValue } from '@vuelidate/validators';
import { DataForm } from '@/types/FormData';

const activePhase: Ref<number> = ref(1);
const transitionName: Ref<string> = ref('');
const minAge: Ref<number> = ref(13);
const currAge: Ref<number | null> = ref(null);
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
    phoneNumber: null,
  },
});

const rules = computed(() => {
  return {
    firstName: { required, validateFirstName },
    lastName: { required, validateLastName },
    email: { required, email },
    password: { required, validatePassword },
    date: { required, minLength: minLength(10), minValue: minValue(minAge.value), $autoDirty: true },
    address: {
      street: { required },
      city: { required, validateCity },
      postalCode: { required },
      country: { required },
      phoneNumber: { required },
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

watch(formData, (newFormDate) => {
  newFormDate.date = validateDate(newFormDate.date);

  if (!v$.value.date.minLength.$invalid) {
    currAge.value = calculateAge(formData.date);
  }
});

function goToStep(value: number, transitionValue?: string) {
  activePhase.value = value;

  if (transitionValue) transitionName.value = transitionValue;
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
@/utils/validateDate
