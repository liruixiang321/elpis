module.exports = (app, router) => {
  const projectController = app.controller.project;
  router.get("/projects", projectController.getProject);
};
