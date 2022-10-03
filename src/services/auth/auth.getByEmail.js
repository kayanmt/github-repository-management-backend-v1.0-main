export class GetByEmailUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userEmail) {
    return this.repository.getByEmail(userEmail);
  }
}
