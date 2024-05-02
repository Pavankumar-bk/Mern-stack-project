import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';


// https://vitejs.dev/config/
export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'C:/Windows/System32/frontend/cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'C:/Windows/System32/frontend/cert.crt')),
    },
    // Make sure the server is accessible over the local network
    host: '0.0.0.0',
  },
};
