import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https :{
  //     key:"./apire-privateKey.key",
  //     cert: "./apire.crt"
  //   }
  // },
  base: "./",
  plugins: [react()],
  build:{
    emptyOutDir: true,
  }
})

