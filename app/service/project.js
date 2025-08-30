module.exports = (app) => {
  return class ProjectService {
    async getProjectList() {
      // Simulate a database call
      return [
        { id: 1, name: "Project A" },
        { id: 2, name: "Project B" },
      ];
    }
  };
};
