/**
 * error handling middleware
 */
module.exports = (app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const { status, message } = error;
      app.logger.info("Request failed:", ctx.request.method, ctx.request.url, {
        status,
        message,
      });
      if (message && message.indexOf("template not found") > -1) {
        ctx.status = 301;
        ctx.redirect(app.options.homePage || "/");
        return;
      }
      const resBody = {
        message: "网络错误",
        detail: message,
        code: 5000,
      };
      ctx.status = 200;
      ctx.body = resBody;
      app.logger.error("Error occurred:", error);
    }
  };
};
