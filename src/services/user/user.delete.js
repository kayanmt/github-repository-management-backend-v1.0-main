export class DeleteUserUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId) {
    return await this.repository.delete(userId);
  }
}
