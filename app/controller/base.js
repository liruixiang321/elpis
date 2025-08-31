module.exports = (app) =>
  class BaseController {
    constructor(app) {
      this.app = app;
      //   this.config = app.config;
      //   this.service = app.service;
    }

    // 统一成功响应
    success(ctx, data = {}, metadata = {}) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        data,
        metadata,
      };
    }

    // 统一失败响应
    fail(ctx, message = "请求失败", code = -1) {
      ctx.body = {
        code,
        message,
      };
    }
  };
