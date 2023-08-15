<template>
  <base-auth-wrapper>
    <form action="">
      <transition mode="out-in" name="auth">
        <div class="form-wrapper" v-if="activePhase === 1">
          <div class="form-control">
            <label for="firstName"><strong>First name</strong> </label>
            <input
              id="firstName"
              type="text"
              required
              placeholder="Enter your first name"
              v-model.trim="formData.firstName"
            />
          </div>
          <div class="form-control">
            <label for="lastName"><strong>Last name</strong></label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="Enter your last name"
              v-model.trim="formData.lastName"
            />
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input id="email" type="email" required placeholder="Enter your email" v-model.trim="formData.email" />
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              v-model.trim="formData.password"
            />
          </div>
          <div class="form-control">
            <label for="date">Date of birth</label>
            <input id="date" type="date" required v-model.trim="formData.date" />
          </div>
        </div>
        <div class="form-wrapper" v-else>
          <div class="form-control">
            <label for="tel">Phone number</label>
            <input
              id="tel"
              type="tel"
              required
              placeholder="Enter your phone number"
              v-model.trim="formData.address.phoneNumber"
            />
          </div>
          <div class="form-control">
            <label for="street">Street</label>
            <input
              id="street"
              type="text"
              required
              placeholder="Enter your street"
              v-model.trim="formData.address.street"
            />
          </div>
          <div class="form-control">
            <label for="street">City</label>
            <input id="city" type="text" required placeholder="Enter your city" v-model.trim="formData.address.city" />
          </div>
          <div class="form-control">
            <label for="postalCode">Postal code</label>
            <input
              id="postalCode"
              type="text"
              required
              placeholder="Enter your postal code"
              v-model.trim="formData.address.postalCode"
            />
          </div>
          <div class="form-control">
            <label for="street">Country</label>
            <input
              id="country"
              type="text"
              required
              placeholder="Enter your country"
              v-model.trim="formData.address.country"
            />
          </div>
        </div>
      </transition>
      <base-auth-button v-if="!isLastPage" @click.prevent="goToStep(2)" mode="true">continue</base-auth-button>
      <div class="button-wrapper" v-else>
        <base-auth-button @click="goToStep(1)">back</base-auth-button>
        <base-auth-button>submit</base-auth-button>
        <span class="underline"></span>
      </div>
    </form>
  </base-auth-wrapper>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, onMounted } from 'vue';
import { DataForm } from '@/types/FormData';

const activePhase: Ref<number> = ref(1);
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

const isLastPage = computed(() => {
  if (tabs.value) {
    return activePhase.value === 2;
  }

  return false;
});

function goToStep(value: number) {
  activePhase.value = value;
}

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
.auth-enter-from {
  opacity: 0;
  // transform: translateX(-10px);
  width: 0;
}

.auth-leave-to {
  opacity: 0;
  // transform: translateX(10px);
  width: 0;
}

.auth-enter-active {
  transition: all 1s ease-out;
}
.auth-leave-active {
  transition: all 1s ease-in;
}

.auth-enter-to,
.auth-leave-from {
  opacity: 1;
  // transform: translateY(0);
  width: 100%;
}
</style>
