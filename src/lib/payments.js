import api from './api'

export async function createRazorpayOrder({ amount_paise, receipt, notes }) {
  const { data } = await api.post('/api/payments/razorpay/create-order/', {
    amount_paise, receipt, notes
  })
  return data // { order_id, amount, currency, key_id }
}

export async function verifyRazorpayPayment(payload) {
  const { data } = await api.post('/api/payments/razorpay/verify/', payload)
  return data // { status: 'ok' }
}
