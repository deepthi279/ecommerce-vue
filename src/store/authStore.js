// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: JSON.parse(localStorage.getItem('user') || 'null'),
//     isModalOpen: false
//   }),
//   getters: {
//     isAuthed: (s) => !!s.user
//   },
//   actions: {
//     openModal() { this.isModalOpen = true },
//     closeModal() { this.isModalOpen = false },
//     signIn({ name, email, phone }) {
//       this.user = { name, email, phone }
//       localStorage.setItem('user', JSON.stringify(this.user))
//       this.isModalOpen = false
//     },
//     signOut() {
//       this.user = null
//       localStorage.removeItem('user')
//     }
//   }
// })



import { defineStore } from 'pinia'
import { clearToken, isLoggedIn } from '@/lib/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loggedIn: isLoggedIn(),
  }),
  actions: {
    signIn(user) {
      this.user = user
      this.loggedIn = true
    },
    signOut() {
      this.user = null
      this.loggedIn = false
      clearToken()
    },
  },
})
