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
};
