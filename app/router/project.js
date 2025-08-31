module.exports = (app, router) => {
  const projectController = app.controller.project;
  router.get(
    "/api/project/list",
    projectController.getProject.bind(projectController)
  );
};
