export class DeleteRepoUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId, repoName) {
    const repo = await this.repository.delete(userId, repoName);
    return repo.repositories.filter((item) => (item.name === repoName));
  }
}
