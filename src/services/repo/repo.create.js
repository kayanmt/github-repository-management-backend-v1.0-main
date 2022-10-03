import Repo from "../../entities/repo.entity.js";

export class CreateRepoUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId, repoBody) {
    const id = userId;
    const newRepo = new Repo(repoBody);
    newRepo.validate();
    const repo = await this.repository.create(id, newRepo.getRepo());
    return repo.repositories.filter((item) => item.name === repoBody.name);
  }
}
