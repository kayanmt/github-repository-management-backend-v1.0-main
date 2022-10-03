export class RepoRoutes {
  constructor(controller, middleware, router) {
    this.controller = controller;
    this.middleware = middleware;
    this.router = router;
  }

  route() {
    this.router.post(
      "/create-repository",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.createRepoController(req, res)
    );

    this.router.delete(
      "/delete-repository/:name",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.deleteRepoController(req, res)
    );

    this.router.get(
      "/get-all-repository",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.getAllRepoController(req, res)
    );

    this.router.put(
      "/update-repository/:name",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.updateRepoController(req, res)
    );

    return this.router;
  }
}
