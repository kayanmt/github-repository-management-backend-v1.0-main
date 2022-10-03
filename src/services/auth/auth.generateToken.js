import jwt from "jsonwebtoken";

export class GenerateTokenUseCase {
  execute(userId) {
    return jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: 86400,
    });
  }
}
