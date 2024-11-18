import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    server: {
        host: '0.0.0.0',  // Asegúrate de que Vite escuche en todas las interfaces de red
        port: 5173,       // El puerto que Render necesita escuchar, puedes cambiarlo si es necesario
      },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
