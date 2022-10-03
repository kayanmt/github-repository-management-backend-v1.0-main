import { RepoRepository } from "../database/repositories/repo.repository.js";
import * as repoServices from "../services/repo.services.index.js";
import { RepoController } from "../controllers/repo.controller.js";
import { RepoRoutes } from "../routes/repo.routes.js";
import { middleware } from "../factories/middleware.factory.js";

export function makeRepoFactory(router) {
  const repoRepository = new RepoRepository();

  const createRepoUseCase = new repoServices.CreateRepoUseCase(repoRepository);
  const deleteRepoUseCase = new repoServices.DeleteRepoUseCase(repoRepository);
  const getAllRepoUseCase = new repoServices.GetAllRepoUseCase(repoRepository);
  const updateRepoUseCase = new repoServices.UpdateRepoUseCase(repoRepository);

  const repoController = new RepoController({
    createRepoUseCase,
    deleteRepoUseCase,
    getAllRepoUseCase,
    updateRepoUseCase,
  });

  const repoRoutes = new RepoRoutes(repoController, middleware, router);

  return repoRoutes;
}
