export class GetAllRepoUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId) {
    const repo = await this.repository.getAll(userId);
    return repo.repositories;
  }
}
