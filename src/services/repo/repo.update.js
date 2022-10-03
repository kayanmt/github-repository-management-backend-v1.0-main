import Repo from "../../entities/repo.entity.js";

export class UpdateRepoUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId, nameRepo, repoBody) {
    const newRepo = new Repo(repoBody);
    newRepo.validate();
    const repo = await this.repository.update(
      userId,
      nameRepo,
      newRepo.getRepo()
    );
    return repo.repositories.filter((item) => item.name === newRepo.name);
  }
}
