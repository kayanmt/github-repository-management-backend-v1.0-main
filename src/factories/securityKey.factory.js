import { SecurityKeyRepository } from "../database/repositories/securityKey.repository.js";
import * as securityKeyServices from "../services/securityKey.index.js";
import { SecurityKeyController } from "../controllers/securityKey.controller.js";
import { SecurityKeyRoutes } from "../routes/securityKey.routes.js";
import { middleware } from "../factories/middleware.factory.js";

export function makeSecurityKeyFactory(router) {
  const securityKeyRepository = new SecurityKeyRepository();

  const createSecurityKeyUseCase =
    new securityKeyServices.CreateSecurityKeyUseCase(securityKeyRepository);
  const getAllSecurityKeyUseCase =
    new securityKeyServices.GetAllSecurityKeyUseCase(securityKeyRepository);
  const editPasswordByEmailUseCase =
    new securityKeyServices.EditPasswordByEmailUseCase(securityKeyRepository);

  const securityKeyController = new SecurityKeyController({
    createSecurityKeyUseCase,
    getAllSecurityKeyUseCase,
    editPasswordByEmailUseCase,
  });

  const securityKeyRoutes = new SecurityKeyRoutes(
    securityKeyController,
    middleware,
    router
  );

  return securityKeyRoutes;
}
