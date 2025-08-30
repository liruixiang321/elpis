module.exports = (app) => {
  return class ProjectController {
    async getProject(ctx) {
      const { project: projectService } = app.service;
      const project = await projectService.getProjectList();
      ctx.body = {
        res: project,
        metadata: {},
        success: true,
      };
      ctx.status = 200;
    }
  };
};
