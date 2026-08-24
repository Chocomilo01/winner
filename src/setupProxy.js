const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://winner-3hjl.onrender.com",
      changeOrigin: true,
    }),
  );
};
