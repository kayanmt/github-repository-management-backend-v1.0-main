export class GetAllSecurityKeyUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userEmail) {
    const keys = await this.repository.getKeys(userEmail);
    return keys.securityKeys;
  }
}
