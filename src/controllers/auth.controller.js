export class AuthController {
  constructor(services) {
    this.services = services;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Invalid email or password.");
      }

      const foundUser = await this.services.getByEmailUseCase.execute(email);

      if (!foundUser) {
        throw new Error("Email not found.");
      }

      const verify = this.services.verifyPasswordUseCase.execute(
        password,
        foundUser
      );

      const token = this.services.generateTokenUseCase.execute(foundUser.id);

      if (verify === true) {
        res.status(200).send({ token: token, userId: foundUser.id });
      } else {
        throw new Error("Wrong password.");
      }
    } catch (err) {
      res.status(400).send({ message: "There was an error in Login. " + err });
    }
  }
}
