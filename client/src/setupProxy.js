const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/api/v1/users", "/auth", "connect", "/unlink", "/connect", "/webhook"],
    createProxyMiddleware({
      target: "http://localhost:5000",
      //changeOrigin: true,
    })
  );
};