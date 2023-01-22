const { createProxyMiddleware } = require("http-proxy-middleware");
const keys = require('./config/keys');

module.exports = function (app) {
  app.use(
    ["/api", "/api/v1/users", "/auth", "connect", "/unlink", "/connect", "/webhook"],
    createProxyMiddleware({
      target: keys.proxyTarget,
      changeOrigin: true,
    })
  );
};