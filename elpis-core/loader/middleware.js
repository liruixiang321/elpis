const { glob } = require("glob");
const path = require("path");

/**
 * Middleware loader
 * @param {object} app - Koa application instance
 *
 * 加载所有middleware,可通过'app.middleware.{目录}.{文件名}'访问
 *
   例子：
   app/middleware
   |
   |-- custom-module
       |-- custom-middleware.js
   => app.middleware.customModule.customMiddleware
    */
module.exports = (app) => {
  //读取middleware目录下的所有文件
  console.log(app.businessPath);
  const middlewarePath = path.resolve(
    app.businessPath,
    `.${path.sep}middleware`
  );
  console.log(middlewarePath);
  const fileList = glob.sync(
    path.resolve(middlewarePath, `.${path.sep}**${path.sep}**.js`)
  );
  console.log(fileList);
  const middlewares = {};
  fileList.forEach((file) => {
    const moduleName = path.relative(middlewarePath, file);
    const modulePath = moduleName
      .replace(/\.js$/, "")
      .replace(/[-/](.)/g, (match, char) => char.toUpperCase());
    const names = modulePath.split(path.sep);
    let tempMiddleware = middleware;
    for (let i = 0; i < names.length - 1; i++) {
      const name = names[i];
      if (i == names.length - 1) {
        tempMiddleware[name] = require(path.resolve(file))(app);
      } else {
        if (!tempMiddleware[name]) {
          tempMiddleware[name] = {};
        }
        tempMiddleware = tempMiddleware[name];
      }
    }
  });
  console.log(middlewares);
  app.middlewares = middlewares;
};
