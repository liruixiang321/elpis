const superAgent = require("superagent");
module.exports = (app) =>
  class BaseService {
    /**
     * service基类，同一收拢service公共方法
     */
    constructor() {
      this.app = app;
      this.config = app.config;
      this.curl = superAgent;
    }
  };
