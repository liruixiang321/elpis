/**
 * Controller loader
 * @param {object} app - Koa application instance
 *
 * 加载控制器
 
   例子：
   app/controller
   |
   |-- custom-module
       |-- custom-controller.js
   => app.controller.customModule.customController
 */

const { glob } = require("glob");
const path = require("path");

module.exports = (app) => {
  const controller = {};
  const controllerPath = path.resolve(
    app.businessPath,
    `.${path.sep}controller`
  );
  const fileList = glob.sync(
    path.resolve(controllerPath, `.${path.sep}**${path.sep}*.js`)
  );
  fileList.forEach((file) => {
    const moduleName = path.relative(controllerPath, file);
    const modulePath = moduleName
      .replace(/\.js$/, "")
      .replace(/[_-](.)/g, (match, char) => char.toUpperCase());
    const names = modulePath.split(path.sep);
    let current = controller;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (i === names.length - 1) {
        const ControllerModule = require(path.resolve(file))(app);
        current[name] = new ControllerModule();
      } else {
        if (!current[name]) {
          current[name] = {};
        }
        current = current[name];
      }
    }
  });
  app.controller = controller;
  return controller;
};
