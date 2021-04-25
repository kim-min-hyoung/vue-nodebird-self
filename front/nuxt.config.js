module.exports = {
  head: {
    title: "nodebird",
  },
  buildModules: ["@nuxtjs/vuetify"],
  modules: ["@nuxtjs/axios"],
  plugins: [],
  vuetify: {},
  axios: {
    browserBaseURL: "http://localhost:3085",
    baseURL: "http://localhost:3085",
    https: false,
  },

  server: {
    port: 3080,
  },
};
