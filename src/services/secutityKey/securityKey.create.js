import SecurityKey from "../../entities/securityKey.entity.js";

export class CreateSecurityKeyUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userEmail, arrKeys) {
    const arr = [];

    for (let key of arrKeys) {
      const newKey = new SecurityKey(key);
      newKey.validate();
      arr.push({ ...newKey.getKey() });
    }

    const data = await this.repository.addKeys(userEmail, arr);
    return data;
  }
}
