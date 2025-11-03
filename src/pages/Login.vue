src/pages/Login.vue
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 grid lg:grid-cols-3 gap-8">
      <!-- LEFT -->
      <div class="lg:col-span-2">
        <!-- Express checkout -->
        <section class="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Express checkout</h3>
          <div class="flex flex-wrap gap-3">
            <button class="h-11 px-5 rounded-md bg-[#5A31F4] text-white text-sm font-semibold shadow-sm">Shop&nbsp;Pay</button>
            <button class="h-11 px-5 rounded-md bg-[#FFC439] text-black text-sm font-semibold shadow-sm">PayPal</button>
            <button class="h-11 px-5 rounded-md bg-black text-white text-sm font-semibold shadow-sm">G&nbsp;Pay</button>
            <button class="h-11 px-5 rounded-md bg-[#0074DE] text-white text-sm font-semibold shadow-sm">Venmo</button>
          </div>

          <div class="my-6 flex items-center gap-4">
            <div class="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            <span class="text-xs text-gray-400">OR</span>
            <div class="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <!-- Contact -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Contact</h4>
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm text-gray-700 dark:text-gray-300">Email</label>
              <button type="button" class="text-sm text-green-700 dark:text-green-400 hover:underline" @click="showLogin = true">
                Log in
              </button>
            </div>
            <input
              v-model="contact.email"
              type="email"
              placeholder="Email"
              class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100"
            />
            <label class="mt-3 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input v-model="contact.optIn" type="checkbox" class="rounded border-gray-300 dark:border-gray-600" />
              Email me with news and offers
            </label>
          </div>

          <!-- Delivery ... (unchanged) -->
          <div class="space-y-3">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Delivery</h4>

            <div>
              <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Country/Region</label>
              <div class="relative">
                <select v-model="delivery.country"
                        class="w-full h-11 rounded-md border dark:border-gray-700 px-3 appearance-none dark:bg-gray-800 dark:text-gray-100">
                  <option>United States</option>
                  <option>India</option>
                  <option>United Kingdom</option>
                </select>
                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">First name</label>
                <input v-model="delivery.first" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100" />
              </div>
              <div>
                <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Last name</label>
                <input v-model="delivery.last" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100" />
              </div>
            </div>

            <div>
              <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Address</label>
              <div class="relative">
                <input v-model="delivery.address" class="w-full h-11 rounded-md border dark:border-gray-700 px-10 pr-3 dark:bg-gray-800 dark:text-gray-100" />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>

            <div>
              <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">Apartment, suite, etc. (optional)</label>
              <input v-model="delivery.apt" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100" />
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">City</label>
                <input v-model="delivery.city" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100" />
              </div>
              <div>
                <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">State</label>
                <div class="relative">
                  <select v-model="delivery.state" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 appearance-none dark:bg-gray-800 dark:text-gray-100">
                    <option>New Hampshire</option>
                    <option>Tamil Nadu</option>
                    <option>Maharashtra</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                </div>
              </div>
              <div>
                <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300">ZIP code</label>
                <input v-model="delivery.zip" class="w-full h-11 rounded-md border dark:border-gray-700 px-3 dark:bg-gray-800 dark:text-gray-100" />
              </div>
            </div>
          </div>
        </section>

        <!-- Payment block kept as-is ... -->

        <section class="mt-8 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Payment</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">All transactions are secure and encrypted.</p>
          <!-- ... your existing payment + billing content ... -->

          <button class="mt-6 w-full h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold" @click="continueToCheckout">
            Pay now
          </button>

          <p class="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
            New customer?
            <button class="text-green-700 dark:text-green-400 hover:underline" type="button" @click="openCreate">
              Create account
            </button>
          </p>
        </section>
      </div>

      <!-- RIGHT summary left unchanged -->
      <aside class="lg:sticky lg:top-8 h-fit">
        <!-- ... -->
      </aside>
    </div>

    <!-- MODALS -->
    <LoginModal
      v-if="showLogin"
      @close="showLogin = false"
      @switch-to-create="showCreate = true" 
    />
    <CreateAccountModal
      v-if="showCreate"
      @close="showCreate = false"
      @switch-to-login="showLogin = true"
      @created="handleAccountCreated" 
    />

    <!-- TOAST -->
    <transition name="fade">
      <div
        v-if="toast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50"
      >
        {{ toast }}
      </div>
    </transition>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import LoginModal from '@/components/LoginModal.vue'
import CreateAccountModal from '@/pages/CreateAccountModal.vue'

// import your auth functions that call backend (/api/login/, /api/signup/)
import { loginUser, signupUser } from '@/lib/auth'

const router = useRouter()
const auth = useAuthStore()

const showLogin = ref(false)
const showCreate = ref(false)
const toast = ref('')

function showToast (msg, ms = 2000) {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, ms)
}

const contact = reactive({ email: '', optIn: true })
const delivery = reactive({
  country: 'United States', first: '', last: '', address: '', apt: '',
  city: '', state: 'New Hampshire', zip: ''
})
const payment = reactive({ card: '', exp: '', cvv: '', name: '' })
const billing = reactive({
  sameAsShipping: true, country: 'United States', first: '', last: '',
  address: '', city: '', state: 'New Hampshire', zip: '', phone: ''
})
const summary = reactive({ code: '' })

function continueToCheckout () {
  const displayName =
    delivery.first || delivery.last
      ? `${delivery.first} ${delivery.last}`.trim()
      : (contact.email ? contact.email.split('@')[0] : 'Guest')

  auth.signIn({ name: displayName, email: contact.email || 'guest@example.com', phone: '' })
  router.push({ name: 'Checkout' })
}

function openCreate () { showCreate.value = true }
function switchToCreate () { showLogin.value = false; showCreate.value = true }
function switchToLogin () { showCreate.value = false; showLogin.value = true }

// ---------- API handlers (login & signup) ----------
async function handleLogin({ email, password }) {
  // your backend uses username (or email) — pass what your login endpoint expects.
  // If DRF view expects 'username', change email->username or adapt backend.
  try {
    // using email as username — adjust if your backend expects 'username'
    const resp = await loginUser({ username: email, password })
    // loginUser stores token in localStorage (see src/lib/auth.js)
    auth.signIn({ name: resp.username || resp.email, email: resp.email || resp.username })
    showLogin.value = false
    showToast('Logged in successfully!')
    // redirect to checkout or where user wanted to go
    router.push({ name: 'Checkout' })
  } catch (err) {
    console.error('Login error', err)
    const msg = err?.response?.data?.error || err?.response?.data?.detail || 'Invalid credentials'
    showToast(msg)
  }
}

async function handleSignup({ username, email, password }) {
  try {
    const resp = await signupUser({ username, email, password })
    // signupUser stores token already
    auth.signIn({ name: resp.username || resp.email, email: resp.email || resp.username })
    showCreate.value = false
    showToast('Account created successfully!')
    router.push({ name: 'Checkout' })
  } catch (err) {
    console.error('Signup error', err)
    const msg = err?.response?.data?.error || JSON.stringify(err?.response?.data) || 'Signup failed'
    showToast(msg)
  }
}
</script>


<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
