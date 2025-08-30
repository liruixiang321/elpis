/**
 * Extend Koa prototype
 * @param {object} app - Koa application instance
    加载所有extend,可通过app.extend.{文件名字}访问
    例子：
    app/extend
    |
    |-- custom-module
    => app.extend.customModule
*/

const glob = require("glob");
const path = require("path");

module.exports = (app) => {
  // Extend Koa context
  let extendPath = path.resolve(app.businessPath, `.${path.sep}extend`);
  let fileList = glob.sync(path.resolve(extendPath, `.${path.sep}*.js`));
  fileList.forEach((file) => {
    let name = path.resolve(file);
    name
      .replace(/\.js$/, "")
      .replace(/[-_](.)/g, (match, char) => char.toUpperCase());

    for (let key in app) {
      if (key === name) {
        throw new Error(`扩展名 ${name} 已存在，请更换`);
      }
    }
    app[name] = require(path.resolve(file))(app);
  });
};
