import bcrypt from "bcryptjs";

export class VerifyPasswordUseCase {
  execute(password, user) {
    const result = bcrypt.compareSync(password, user.password);
    return result === true ? true : false;
  }
}
