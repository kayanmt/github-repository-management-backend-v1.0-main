export class EditPasswordByEmailUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userEmail, newPassword) {
    return await this.repository.editPassword(userEmail, newPassword);
  }
}
