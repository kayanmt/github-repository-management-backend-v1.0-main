export class UserRoutes {
  constructor(controller, middleware, router) {
    this.controller = controller;
    this.middleware = middleware;
    this.router = router;
  }

  route() {
    this.router.post("/create-user", (req, res) =>
      this.controller.createUserController(req, res)
    );

    this.router.put(
      "/update-user",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.updateUserController(req, res)
    );

    this.router.delete(
      "/delete-user",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.deleteUserController(req, res)
    );

    this.router.get(
      "/get-all-user",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.getAllUserController(req, res)
    );

    this.router.get(
      "/get-by-email-user/:email",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.getUserByEmailController(req, res)
    );

    this.router.get(
      "/get-by-id-user/:id",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.getUserByIdController(req, res)
    );

    return this.router;
  }
}
