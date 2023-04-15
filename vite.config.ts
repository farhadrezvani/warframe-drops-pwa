import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "robots.txt",
        "assets/favicon.ico",
        "assets/favicon.svg",
        "assets/apple-touch-icon.png",
        "assets/ibm-plex-sans-var.woff2",
      ],
      manifest: {
        name: "Warframe Drops PWA",
        short_name: "Warframe Drops PWA",
        description:
          "a warframe app that finds the best place to farm any in-game item by looking through the official drop tables published by Digital Extremes.",
        theme_color: "#1c1917",
        background_color: "#1c1917",
        icons: [
          {
            src: "assets/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
