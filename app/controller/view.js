module.exports = (app) => {
  return class ViewController {
    /**
     * Render a view with the given model data.
     * @param {object} ctx - Koa context object
     */
    async renderPage(ctx) {
      await ctx.render(`output/entry.${ctx.params.page}`);
    }
  };
};
