export class SecurityKeyRoutes {
  constructor(controller, middleware, router) {
    this.controller = controller;
    this.middleware = middleware;
    this.router = router;
  }

  route() {
    this.router.post(
      "/create-security-keys",
      (req, res, next) => this.middleware.verifyToken(req, res, next),
      (req, res) => this.controller.createSecurityKeyController(req, res)
    );

    this.router.post("/get-security-key-references", (req, res) =>
      this.controller.getAllSecurityKeyReferencesController(req, res)
    );

    this.router.post("/recover-password", (req, res) =>
      this.controller.editPasswordByEmailController(req, res)
    );

    return this.router;
  }
}
