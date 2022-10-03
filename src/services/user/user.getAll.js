export class GetAllUserUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute() {
    return await this.repository.getAll();
  }
}
