<template>
  <div>
    <h1 class="profile__header">Account information</h1>
    <div class="profile__wrapper">
      <div class="row">
        <div class="form-control">
          <label for="firstName">First name</label>
          <div class="form-item">
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              v-model="data.firstName"
              :disabled="!isFirstNameEdit"
              :class="{ disabled: !isFirstNameEdit }"
            />
            <font-awesome-icon
              v-if="!isFirstNameEdit"
              @click="isFirstNameEdit = !isFirstNameEdit"
              icon="pen-to-square"
            />
            <div class="form-item" v-else>
              <font-awesome-icon @click="setFirstName($event, 'cancel')" icon="fa-solid fa-xmark" />
              <font-awesome-icon @click="setFirstName($event, 'submit')" icon="fa-solid fa-check" />
            </div>
          </div>
        </div>
        <div class="form-control">
          <label for="lastName">Last name</label>
          <div class="form-item">
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              v-model="data.lastName"
              :disabled="!isLastNameEdit"
              :class="{ disabled: !isLastNameEdit }"
            />
            <font-awesome-icon v-if="!isLastNameEdit" @click="isLastNameEdit = !isLastNameEdit" icon="pen-to-square" />
            <div class="form-item" v-else>
              <font-awesome-icon @click="setLastName($event, 'cancel')" icon="fa-solid fa-xmark" />
              <font-awesome-icon @click="setLastName($event, 'submit')" icon="fa-solid fa-check" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <div class="form-item">
          <input
            id="email"
            type="email"
            placeholder="Email"
            v-model="data.email"
            :disabled="!isEmailEdit"
            :class="{ disabled: !isEmailEdit }"
          />
          <font-awesome-icon v-if="!isEmailEdit" @click="isEmailEdit = !isEmailEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setEmail($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setEmail($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
        <!-- <div class="input-errors" v-if="v$.body.email.$dirty && v$.body.email.required.$invalid">
          <div class="error-msg">Email can't be empty</div>
        </div>
        <div class="input-errors" v-else-if="v$.body.email.$dirty && v$.body.email.email.$invalid">
          <div class="error-msg">Enter valid email address</div>
        </div> -->
      </div>
      <div class="form-control">
        <label for="date">Date of birth</label>
        <div class="form-item">
          <input
            id="date"
            type="text"
            placeholder="yyyy-mm-dd"
            maxlength="10"
            minlength="10"
            inputmode="numeric"
            v-model="data.dateOfBirth"
            :disabled="!isDateBirthEdit"
            :class="{ disabled: !isDateBirthEdit }"
          />
          <font-awesome-icon v-if="!isDateBirthEdit" @click="isDateBirthEdit = !isDateBirthEdit" icon="pen-to-square" />
          <div class="form-item" v-else>
            <font-awesome-icon @click="setDateOfBirth($event, 'cancel')" icon="fa-solid fa-xmark" />
            <font-awesome-icon @click="setDateOfBirth($event, 'submit')" icon="fa-solid fa-check" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();
const getUser = computed(() => store.getters['customer/getUser']);
const getVersion = computed(() => store.getters['customer/getVersion']);
const isEmailEdit = ref(false);
const isFirstNameEdit = ref(false);
const isLastNameEdit = ref(false);
const isDateBirthEdit = ref(false);
const data = reactive({
  firstName: getUser.value.firstName,
  lastName: getUser.value.lastName,
  email: getUser.value.email,
  dateOfBirth: getUser.value.dateOfBirth,
  version: getVersion,
});

// eslint-disable-next-line max-lines-per-function
async function setFirstName(event: Event, mode: string) {
  isFirstNameEdit.value = !isFirstNameEdit.value;

  if (mode === 'submit') {
    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setFirstName',
          firstName: input.value,
        },
      ],
    };

    store.commit('customer/setVersion', data.version + 1);

    try {
      const updateCustomer = async () => {
        await store.dispatch('customer/updateCustomer', formData);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'First name is updating',
          success: 'First name has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    data.firstName = getUser.value.firstName;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setLastName(event: Event, mode: string) {
  isLastNameEdit.value = !isLastNameEdit.value;

  if (mode === 'submit') {
    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setLastName',
          lastName: input.value,
        },
      ],
    };

    store.commit('customer/setVersion', data.version + 1);

    try {
      const updateCustomer = async () => {
        await store.dispatch('customer/updateCustomer', formData);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Last name is updating',
          success: 'Last name has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    data.lastName = getUser.value.lastName;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setDateOfBirth(event: Event, mode: string) {
  isDateBirthEdit.value = !isDateBirthEdit.value;

  if (mode === 'submit') {
    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'setDateOfBirth',
          dateOfBirth: input.value,
        },
      ],
    };

    store.commit('customer/setVersion', data.version + 1);

    try {
      const updateCustomer = async () => {
        await store.dispatch('customer/updateCustomer', formData);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Date of birth is updating',
          success: 'Date of birth has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    data.dateOfBirth = getUser.value.dateOfBirth;
  }
}
// eslint-disable-next-line max-lines-per-function
async function setEmail(event: Event, mode: string) {
  isEmailEdit.value = !isEmailEdit.value;

  if (mode === 'submit') {
    const parentElem = event.currentTarget as HTMLElement;

    const input = parentElem.parentElement?.parentElement?.firstChild as HTMLInputElement;

    const formData = {
      version: data.version,
      actions: [
        {
          action: 'changeEmail',
          email: input.value,
        },
      ],
    };

    store.commit('customer/setVersion', data.version + 1);

    try {
      const updateCustomer = async () => {
        await store.dispatch('customer/updateCustomer', formData);
      };

      toast.promise(
        updateCustomer,
        {
          pending: 'Email is updating',
          success: 'Email has updated 👌',
          error: 'Something goes wrong 🤯',
        },
        {
          theme: 'dark',
          icon: '🎉',
          transition: toast.TRANSITIONS.SLIDE,
        },
      );
    } catch (error) {
      console.log(error);
    }
  } else if (mode === 'cancel') {
    data.email = getUser.value.email;
  }
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
    @media (max-width: 600px) {
      font-size: calc(16px + (20 - 16) * ((100vw - 320px) / (600 - 320)));
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & .row {
      display: flex;
      flex-direction: row;
      gap: 20px;
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }
}
.form-control {
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    width: 100%;
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
  & label {
    color: $mainWhiteColor;
    opacity: 0.8;
    white-space: nowrap;
    font-size: 16px;
    @media (max-width: 600px) {
      font-size: 15px;
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
</style>
