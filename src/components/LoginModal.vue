<!-- <template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-full max-w-md">
      <h3 class="text-2xl font-bold text-center text-green-800 mb-4">My account</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
        Due to system updates, please sign up for a new account. Your email address used with the most recent order
        will feature the ability to view any current or past orders.
      </p>

      <form @submit.prevent="$emit('close')" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Email</label>
          <input class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700" />
        </div>
        <div>
          <div class="flex justify-between items-center">
            <label class="block text-sm mb-1">Password</label>
            <button type="button" class="text-sm text-green-700 hover:underline">Forgot password?</button>
          </div>
          <input type="password" class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700" />
        </div>
        <button type="submit" class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded">Sign in</button>
      </form>

      <p class="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
        New customer?
        <button class="text-green-700 hover:underline" @click="$emit('switch-to-create')">Create account</button>
      </p>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close', 'switch-to-create'])
</script> -->




<script setup>
import { ref } from 'vue'
import { loginUser } from '../services/api'

const emit = defineEmits(['close', 'switch-to-create'])

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const showToast = ref(false) // for popup message

async function submitLogin() {
  errorMessage.value = ''
  successMessage.value = ''
  showToast.value = false

  try {
    const credentials = { email: email.value.trim(), password: password.value }
    const res = await loginUser(credentials)

    // If using axios or fetch in loginUser, adjust this check accordingly
    if (res?.status === 200 || res?.token) {
      successMessage.value = 'Login successful!'
      console.log('User Data:', res.user)
      console.log('Token:', res.token)

      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))

      // Show popup
      showToast.value = true

      // Auto hide toast after 2 seconds
      setTimeout(() => {
        showToast.value = false
        emit('close')
      }, 2000)
    } else {
      errorMessage.value = res.error || 'Invalid email or password'
    }
  } catch (err) {
    console.error('Login error:', err)
    errorMessage.value = 'Something went wrong. Try again.'
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-full max-w-md relative">
      <h3 class="text-2xl font-bold text-center text-green-800 mb-4">My Account</h3>

      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Password"
            class="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <button type="submit" class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded">
          Sign in
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-2 text-center">{{ successMessage }}</p>

      <p class="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
        New customer?
        <button class="text-green-700 hover:underline" @click="$emit('switch-to-create')">
          Create account
        </button>
      </p>

      <!-- ✅ Toast Popup -->
      <transition name="fade">
        <div
          v-if="showToast"
          class="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in"
        >
          ✅ Login successful!
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
