<!-- src/pages/CreateAccountModal.vue
<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8">
      <h2 class="text-2xl font-bold text-center text-green-800 mb-6">Create Account</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">First Name</label>
          <input v-model.trim="form.firstName" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Last Name</label>
          <input v-model.trim="form.lastName" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model.trim="form.email" type="email" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            minlength="6"
            required
            class="w-full border rounded-md px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creating…' : 'Create' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <a href="#" class="text-green-600 hover:underline" @click.prevent="$emit('switch-to-login')">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Emitted events:
//  - created(user) => parent can signIn + toast + route
//  - close
//  - switch-to-login
const emit = defineEmits(['created', 'close', 'switch-to-login'])

// Use same env var style as your Checkout.vue
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

const loading = ref(false)
const form = reactive({ firstName: '', lastName: '', email: '', password: '' })

async function handleSubmit () {
  if (loading.value) return
  loading.value = true
  try {
    // Call your backend. It should send the welcome/verification email.
    const resp = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password
      })
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      throw new Error(data?.error || `Registration failed (${resp.status})`)
    }

    // Success → inform parent with user data
    emit('created', data.user || {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email
    })
  } catch (err) {
    alert(err.message || 'Failed to create account')
  } finally {
    loading.value = false
  }
}
</script> -->

 <script setup>
import { ref, reactive } from 'vue'
import { signupUser } from '../services/api' // Import API

const emit = defineEmits(['created', 'close', 'switch-to-login'])

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showToast = ref(false)

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})

async function handleSubmit() {
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  showToast.value = false

  try {
    const res = await signupUser({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password
    })

    if (res.token) {
      successMessage.value = 'Account created successfully!'
      showToast.value = true

      // Store user & token
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))

      // Emit success
      emit('created', res.user)

      // Auto close modal after 2s
      setTimeout(() => {
        showToast.value = false
        emit('close')
      }, 2000)
    } else {
      errorMessage.value = res.error || 'Failed to create account'
    }
  } catch (err) {
    errorMessage.value = 'Something went wrong. Try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8 relative">
      <h2 class="text-2xl font-bold text-center text-green-800 mb-6">Create Account</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">First Name</label>
          <input v-model="form.first_name" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Last Name</label>
          <input v-model="form.last_name" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" required class="w-full border rounded-md px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            minlength="6"
            required
            class="w-full border rounded-md px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 disabled:opacity-60"
        >
          {{ loading ? 'Creating…' : 'Create Account' }}
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-2 text-center">{{ successMessage }}</p>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <a href="#" class="text-green-600 hover:underline" @click.prevent="$emit('switch-to-login')">Sign in</a>
      </p>

      <!-- ✅ Toast Popup -->
      <transition name="fade">
        <div
          v-if="showToast"
          class="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg"
        >
          ✅ Account created successfully!
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
