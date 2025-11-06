<template>
  <div class="min-h-screen dark:bg-gray-900 dark:text-white container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>

    <div v-if="!items.length" class="text-gray-600 dark:text-gray-300">Your cart is empty.</div>

    <div v-else class="grid md:grid-cols-3 gap-6">
      <!-- ORDER SUMMARY -->
      <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded p-4 shadow">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div v-for="it in items" :key="it.id" class="flex justify-between border-b py-2">
          <div>{{ it.name }} x{{ it.qty || 1 }}</div>
          <div>₹{{ it.price * (it.qty || 1) }}</div>
        </div>
        <div class="flex justify-between font-bold text-lg pt-4">
          <span>Total</span>
          <span>₹{{ total }}</span>
        </div>
      </div>

      <!-- CUSTOMER + PAY -->
      <div class="bg-white dark:bg-gray-800 rounded p-4 shadow h-fit">
        <div class="flex items-center justify-between mb-4"></div>

        <div v-if="user">
          <div class="text-sm mb-1"><b>Name:</b> {{ user.name }}</div>
          <div class="text-sm mb-1"><b>Email:</b> {{ user.email }}</div>
          <div class="text-sm mb-4"><b>Phone:</b> {{ user.phone }}</div>

          <button class="text-xs underline text-gray-500" @click="signOut" type="button">Sign out</button>
        </div>

        <button
          @click="pay"
          :disabled="paying || !items.length || !user"
          class="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded"
        >
          {{ paying ? 'Processing…' : `Pay ₹${total}` }}
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()

// CART
const cart = useCartStore()
const items = computed(() => cart.items.map(i => ({ ...i, qty: i.qty || 1 })))
const total = computed(() => items.value.reduce((s, i) => s + i.price * (i.qty || 1), 0))

// AUTH
const auth = useAuthStore?.()
const user = ref(null)
onMounted(() => {
  if (auth?.user) user.value = auth.user
})

// Toast
const paying = ref(false)
const toast = ref({ show: false, message: '' })
function showToast(message, ms = 2000) {
  toast.value = { show: true, message }
  setTimeout(() => (toast.value.show = false), ms)
}

function goLogin() {
  router.push({ name: 'Login', query: { redirect: '/checkout' } })
}

function signOut() {
  auth?.signOut?.()
  user.value = null
  showToast('Signed out')
}

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(s)
  })
}

// --- TEMP STUBS so the app builds without a backend ---
// Replace with real API calls later.
async function createRazorpayOrder({ amount_paise, receipt, notes }) {
  return {
    order_id: 'order_demo_' + Date.now(),
    amount: amount_paise,
    currency: 'INR',
    key_id: 'rzp_test_demoKey', // replace with your real key on server side
    receipt,
    notes,
  }
}
async function verifyRazorpayPayment(_payload) {
  return { ok: true }
}
// ------------------------------------------------------

async function pay() {
  if (!user.value) { goLogin(); return }
  if (!items.value.length) return alert('Your cart is empty')
  if (total.value <= 0) return alert('Amount must be greater than 0')

  await loadRazorpay()
  if (!window.Razorpay) { alert('Payment library not loaded. Refresh the page.'); return }

  try {
    paying.value = true

    const amountPaise = Math.round(total.value * 100)
    const receipt = `rcpt_${Date.now()}`
    const order = await createRazorpayOrder({
      amount_paise: amountPaise,
      receipt,
      notes: {
        email: user.value.email,
        name: user.value.name || '',
      },
    })

    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Sivaji Nursery',
      description: 'Order payment',
      order_id: order.order_id,
      prefill: {
        name: user.value.name || '',
        email: user.value.email || '',
        contact: user.value.phone || '',
      },
      notes: { receipt },
      theme: { color: '#16a34a' },
      method: { upi: true, card: true, netbanking: true, wallet: false, emi: false, paylater: false },
      retry: { enabled: true, max_count: 1 },
      modal: {
        ondismiss: function () { paying.value = false }
      },
      handler: async function (response) {
        try {
          await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
          cart.clearCart && cart.clearCart()
          showToast('Payment successful! Invoice sent to your email.', 3000)
        } catch (e) {
          console.error(e)
          alert('Payment verification failed. Please contact support.')
        } finally {
          paying.value = false
        }
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    console.error(err)
    paying.value = false
    alert(err.message || 'Something went wrong, please try again.')
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>






