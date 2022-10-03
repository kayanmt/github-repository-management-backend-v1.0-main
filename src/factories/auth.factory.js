import { AuthRepository } from "../database/repositories/auth.repository.js";
import * as services from "../services/auth.services.index.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthRoutes } from "../routes/auth.routes.js";

export function makeAuthFactory(router) {
  const authRepository = new AuthRepository();

  const getUserByIdUseCase = new services.GetUserByIdUseCase(authRepository);
  const getByEmailUseCase = new services.GetByEmailUseCase(authRepository);
  const verifyPasswordUseCase = new services.VerifyPasswordUseCase();
  const generateTokenUseCase = new services.GenerateTokenUseCase();

  const authController = new AuthController({
    getUserByIdUseCase,
    getByEmailUseCase,
    verifyPasswordUseCase,
    generateTokenUseCase,
  });

  const authRoutes = new AuthRoutes(authController, router);

  return authRoutes;
}
