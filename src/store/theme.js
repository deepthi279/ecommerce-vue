// import { defineStore } from 'pinia'

// export const useThemeStore = defineStore('theme', {
//   state: () => ({
//     dark: false
//   }),
//   actions: {
//     toggleTheme() {
//       this.dark = !this.dark
//       document.body.classList.toggle('bg-dark', this.dark)
//       document.body.classList.toggle('text-light', this.dark)
//     }
//   }
// })
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: false
  }),
  actions: {
    toggleTheme() {
      this.dark = !this.dark
      document.body.classList.toggle('bg-dark', this.dark)
      document.body.classList.toggle('text-light', this.dark)
    }
  }
})
