/**
 * Router middleware
 * @param {object} app - Koa application instance
   解析所有router下所有的js文件中，记载到KoaKoaRouter

*/

const glob = require("glob");
const path = require("path");
const KoaRouter = require("koa-router");
module.exports = (app) => {
  const router = new KoaRouter();
  const routerPath = path.resolve(app.businessPath, `.${path.sep}router`);
  const fileList = glob.sync(path.resolve(routerPath, `.${path.sep}*js`));
  fileList.forEach((file) => {
    require(path.resolve(file))(app, router);
  });
  console.log(fileList, "<-- fileList");
  //路由兜底
  router.all("*", async (ctx) => {
    ctx.status = 302;
    ctx.redirect(app.options.homePage);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};
