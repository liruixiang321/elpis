/**
 * config loader
 *
 * @param {object} app - Koa application instance
 * 配置区分本地/测试/生产，通过env环境读取不同的配置文件
 * 通过配置env.config覆盖default.config加载到app.config中
 *
 * 目录下对应的配置
 * 默认配置config/config.default.js
 * 本地配置config/config.local.js
 * 测试配置config/config.test.js
 * 生产配置config/config.prod.js
 */

const path = require("path");

module.exports = (app) => {
  const configPath = path.resolve(app.baseDir, `.${path.sep}config`);

  let defaultConfig = {};
  defaultConfig = require(path.resolve(
    configPath,
    `.${path.sep}config.default.js`
  ));
  app.config = defaultConfig;

  let envConfig = {};
  try {
    if (app.env.isLocal()) {
      envConfig = require(path.resolve(
        configPath,
        `.${path.sep}config.local.js`
      ));
    } else if (app.env.isBeta()) {
      envConfig = require(path.resolve(
        configPath,
        `.${path.sep}config.test.js`
      ));
    } else if (app.env.isProduction()) {
      envConfig = require(path.resolve(
        configPath,
        `.${path.sep}config.prod.js`
      ));
    }
  } catch (error) {
    console.error(`Failed to load environment config: ${error.message}`);
  }

  app.config = { ...app.config, ...envConfig };
};
