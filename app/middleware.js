const path = require("path");
const koaNunjucks = require("koa-nunjucks-2");
module.exports = (app) => {
  //配置静态文件夹地址
  console.log(app);
  const koaStatic = require("koa-static");
  app.use(koaStatic(path.resolve(app.baseDir, "app/public")));
  // 模版渲染引擎
  app.use(
    koaNunjucks({
      ext: "tpl",
      path: path.resolve(app.baseDir, "app/public"),
      nunjucksConfig: {
        noCache: true,
        trimBlocks: true,
      },
    })
  );
  //引入ctx.body解析中间件
  const bodyParser = require("koa-bodyparser");
  app.use(
    bodyParser({
      formLimit: "1000mb",
      enableTypes: ["json", "form", "text"],
    })
  );
  app.use(app.middlewares.errorHandle);

  app.use(app.middlewares.apiParamsVerify);
};
