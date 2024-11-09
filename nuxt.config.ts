// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@prisma/nuxt"],
  experimental: {
    componentIslands: true,
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client": "./node_modules/.prisma/client",
      },
    },
  },
  prisma: {
    autoSetupPrisma: true,
    generateClient: false
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: {
              50: "#ffe5e5",
              100: "#ffcccc",
              200: "#ff9999",
              300: "#ff6666",
              400: "#ff3333",
              500: "#ff0000",
              600: "#e60000",
              700: "#cc0000",
              800: "#b30000",
              900: "#990000",
            },
          },
        },
      },
    },
  },
});
