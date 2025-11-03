// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// // import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//     server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true
//       }
//     }
//   }
// })

// vite.config.js
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })

// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174, // change to 5173 if you prefer
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api/',
        changeOrigin: true,
      },
    },
  },
})


