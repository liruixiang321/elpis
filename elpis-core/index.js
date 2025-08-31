const Koa = require("koa");
const path = require("path");
const { sep } = path;
const env = require("./env");
const middlewareLoader = require("./loader/middleware");
const routerSchema = require("./loader/router-schema");
const controller = require("./loader/controller");
const config = require("./loader/config");
const extend = require("./loader/extend");
const router = require("./loader/router");
const service = require("./loader/service");
module.exports = {
  // Your module exports here
  start(options = {}) {
    const app = new Koa();
    // 框架配置
    app.options = options;
    // 应用的根目录
    app.baseDir = process.cwd();

    app.businessPath = path.resolve(app.baseDir, `.${sep}app`);
    //环境
    app.env = env();
    console.log("当前环境", app.env.get());
    config(app);
    console.log("___config loaded___");
    middlewareLoader(app);
    console.log("___middlewareloader loaded___");
    routerSchema(app);
    console.log("___router schema loaded___");
    controller(app);
    console.log("___controller loaded___");

    service(app);
    console.log("___service loaded___");
    extend(app);
    console.log("___extend loaded___");
    //全局中间件 app/middleware.js

    try {
      require(path.resolve(app.businessPath, `.${path.sep}middleware.js`))(app);
      console.log("___global middleware loaded___");
    } catch (error) {
      console.error("Error global loading middleware:", error);
    }

    router(app);
    console.log("___router loaded___");
    console.log(app);
    try {
      const port = process.env.PORT || 8080;
      const host = process.env.HOST || "0.0.0.0";
      app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  },
};
