/**
 * Router schema
 * @param {object} app - Koa application instance
 *
 * 通过‘json-schema’和‘ajv’验证请求参数
 *
 * app/router-schema/**.js
 * 输出：
 * app.schema = {
 *  '${api1}':${jsonSchema}
 * }
 */

const { glob } = require("glob");
const path = require("path");

module.exports = (app) => {
  // 通过‘json-schema’和‘ajv’验证请求参数
  const routerSchemaPath = path.resolve(
    app.businessPath,
    `.${path.sep}router-schema`
  );
  const fileList = glob.sync(
    path.resolve(routerSchemaPath, `.${path.sep}**.js`)
  );
  fileList.forEach((file) => {
    const name = path.relative(routerSchemaPath, file);
    app.routerSchema = {
      ...app.routerSchema,
      [name]: require(path.resolve(file))(app),
    };
  });
};
