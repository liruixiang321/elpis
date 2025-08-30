module.exports = () => {
  return {
    isLocal() {
      return process.env._ENV === "local";
    },
    isProduction() {
      return process.env._ENV === "production";
    },
    isBeta() {
      return process.env._ENV === "beta";
    },
    //   当前环境
    get() {
      return process.env._ENV || "local";
    },
  };
};
