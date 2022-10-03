export class GetUserByIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId) {
    return await this.repository.getById(userId);
  }
}
