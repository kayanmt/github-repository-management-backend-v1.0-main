import User from "../../entities/user.entity.js";

export class CreateUserUseCase {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(userBody) {
    const newUser = new User(userBody);
    newUser.validate();
    return await this.repository.create(newUser.getUser());
  }
}
