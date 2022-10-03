import User from "../../entities/user.entity.js";

export class UpdateUserUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userId, userBody, oldUserBody) {
    const userObj = new User(Object.assign(oldUserBody, userBody));
    return await this.repository.update(userId, userObj.getUser());
  }
}
