import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MapPrototype/',
  // server: {
  //   host: '192.168.0.142',
  //   port: 3000
  // }
})
