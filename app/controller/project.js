module.exports = (app) => {
  const BaseController = require("./base")(app);
  return class ProjectController extends BaseController {
    async getProject(ctx) {
      const { project: projectService } = app.service;
      const project = await projectService.getProjectList();
      const a = project.a.b.c;
      this.success(ctx, project);
    }
  };
};
