module.exports = {
  apps: [
    {
      name: "Planningcheck",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      //   This does not match the local .output folder, but it does match the path once deployed
      script: "./server/index.mjs",
    },
  ],
};
