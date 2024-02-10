/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "routes/home/route.tsx", { index: true });
    });
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
