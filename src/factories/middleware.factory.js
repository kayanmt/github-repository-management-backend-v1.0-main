import { AuthRepository } from "../database/repositories/auth.repository.js";
import * as services from "../services/auth.services.index.js";
import { AuthMiddlewares } from "../middlewares/auth.middlewares.js";

function makeMiddlewareFactory() {
  const authRepository = new AuthRepository();

  const getUserByIdUseCase = new services.GetUserByIdUseCase(authRepository);

  const authMiddlewares = new AuthMiddlewares({ getUserByIdUseCase });

  return authMiddlewares;
}

export const middleware = makeMiddlewareFactory();
