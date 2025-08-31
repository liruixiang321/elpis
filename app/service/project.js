module.exports = (app) => {
  const BaseService = require("./base")(app);
  return class ProjectService extends BaseService {
    async getProjectList() {
      // Simulate a database call
      return [
        { id: 1, name: "Project A" },
        { id: 2, name: "Project B" },
      ];
    }
  };
};
