export class GetUserByEmailUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userEmail) {
    return await this.repository.getByEmail(userEmail);
  }
}
