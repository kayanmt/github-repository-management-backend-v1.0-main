import { UserRepository } from "../database/repositories/user.repository.js";
import * as userServices from "../services/user.services.index.js";
import { UserController } from "../controllers/user.controller.js";
import { UserRoutes } from "../routes/user.routes.js";
import { middleware } from "../factories/middleware.factory.js";

export function makeUserFactory(router) {
  const userRepository = new UserRepository();

  const createUserUseCase = new userServices.CreateUserUseCase(userRepository);
  const deleteUserUseCase = new userServices.DeleteUserUseCase(userRepository);
  const getAllUserUseCase = new userServices.GetAllUserUseCase(userRepository);
  const getUserByEmailUseCase = new userServices.GetUserByEmailUseCase(
    userRepository
  );
  const getUserByIdUseCase = new userServices.GetUserByIdUseCase(
    userRepository
  );
  const updateUserUseCase = new userServices.UpdateUserUseCase(userRepository);

  const userController = new UserController({
    createUserUseCase,
    deleteUserUseCase,
    getAllUserUseCase,
    getUserByEmailUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
  });

  const userRoutes = new UserRoutes(userController, middleware, router);

  return userRoutes;
}
