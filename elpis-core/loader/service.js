const { glob } = require("glob");
const path = require("path");

/**
 * Service loader
 * @param {object} app - Koa application instance
 *
 * 加载所有service,可通过'app.service.{目录}.{文件名}'访问
 *
   例子：
   app/service
   |
   |-- user-module
       |-- user-service.js
   => app.service.userModule.userService
    */
module.exports = (app) => {
  //读取service目录下的所有文件
  const servicePath = path.resolve(app.businessPath, `.${path.sep}service`);
  const fileList = glob.sync(
    path.resolve(servicePath, `${path.sep}**${path.sep}*.js`)
  );
  const service = {};
  fileList.forEach((file) => {
    const moduleName = path.relative(servicePath, file);
    const modulePath = moduleName
      .replace(/\.js$/, "")
      .replace(/[-/](.)/g, (match, char) => char.toUpperCase());
    const names = modulePath.split(path.sep);
    let tempService = service;
    for (let i = 0; i < names.length - 1; i++) {
      const name = names[i];
      if (i == names.length - 1) {
        tempService[name] = require(path.resolve(file))(app);
      } else {
        if (!tempService[name]) {
          tempService[name] = {};
        }
        tempService = tempService[name];
      }
    }
  });
  app.service = service;
};
