/*

日志扩展
外部调用app.logger.xxx
*/
const log4js = require("log4js");
module.exports = (app) => {
  let logger;
  if (app.env.isLocal()) {
    logger = console;
  } else {
    log4js.configure({
      appenders: {
        console: { type: "console" },
        dateFile: {
          type: "dateFile",
          filename: "./logs/application.log",
          pattern: "yyyy-MM-dd",
        },
      },
      categories: {
        default: {
          appenders: ["console", "dateFile"],
          level: "trace",
        },
      },
    });
    logger = log4js.getLogger("app");
  }
  return logger;
};
