<template>
  <base-auth-wrapper>
    <form @submit.prevent="submitHandler">
      <transition mode="out-in" :name="transitionName">
        <div class="form-wrapper" v-if="activePhase === 1">
          <div class="form-control" :class="{ error: v$.firstName.$errors.length }">
            <label for="firstName"><strong>First name</strong> </label>
            <input id="firstName" type="text" placeholder="Enter your first name" v-model.trim="formData.firstName" />
            <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.lastName.$errors.length }">
            <label for="lastName"><strong>Last name</strong></label>
            <input id="lastName" type="text" placeholder="Enter your last name" v-model.trim="formData.lastName" />
            <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.email.$errors.length }">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" v-model.trim="formData.email" />
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.password.$errors.length }">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" v-model.trim="formData.password" />
            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.date.$errors.length }">
            <label for="date">Date of birth</label>
            <input id="date" type="date" v-model.trim="formData.date" />
            <div class="input-errors" v-for="error of v$.date.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>
        <div class="form-wrapper" v-else>
          <div class="form-control" :class="{ error: v$.address.phoneNumber.$errors.length }">
            <label for="tel">Phone number</label>
            <input
              id="tel"
              type="tel"
              placeholder="Enter your phone number"
              v-model.trim="formData.address.phoneNumber"
            />
            <div class="input-errors" v-for="error of v$.address.phoneNumber.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.address.street.$errors.length }">
            <label for="street">Street</label>
            <input id="street" type="text" placeholder="Enter your street" v-model.trim="formData.address.street" />
            <div class="input-errors" v-for="error of v$.address.street.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.address.city.$errors.length }">
            <label for="street">City</label>
            <input id="city" type="text" placeholder="Enter your city" v-model.trim="formData.address.city" />
            <div class="input-errors" v-for="error of v$.address.city.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.address.postalCode.$errors.length }">
            <label for="postalCode">Postal code</label>
            <input
              id="postalCode"
              type="text"
              placeholder="Enter your postal code"
              v-model.trim="formData.address.postalCode"
            />
            <div class="input-errors" v-for="error of v$.address.postalCode.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="form-control" :class="{ error: v$.address.country.$errors.length }">
            <label for="street">Country</label>
            <input id="country" type="text" placeholder="Enter your country" v-model.trim="formData.address.country" />
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
import { reactive, ref, Ref, computed, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { DataForm } from '@/types/FormData';

const activePhase: Ref<number> = ref(1);
const transitionName: Ref<string> = ref('');
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
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: { required },
    date: { required },
    address: {
      street: { required },
      city: { required },
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

function goToStep(value: number, transitionValue?: string) {
  activePhase.value = value;

  if (transitionValue) transitionName.value = transitionValue;
}

const submitHandler = () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    alert('success');
  } else {
    alert('failed');
  }
};

onMounted(() => {
  tabs.value = document.getElementsByClassName('form-wrapper').length;
});
</script>

<style lang="scss" scoped>
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
    background: linear-gradient(90deg, transparent, #fefefe);
    animation: btn-anim1 3s linear infinite;
  }
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
      & label {
        color: #fefefe;
        opacity: 0.8;
        white-space: nowrap;
      }
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        transition: background-color 0s 600000s, color 0s 600000s;
      }
      & input {
        width: 100%;
        padding: 10px 15px;
        border-radius: 6px;
        font-family: inherit;
        background: #010101;
        border: 1px solid #383636;
        color: #fefefe;
        font-size: 15px;
        &::placeholder {
          opacity: 0.8;
        }
        &:focus {
          outline: none;
          border-color: #fefefe;
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
</style>
