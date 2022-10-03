export class UserController {
  constructor(services) {
    this.createUserUseCase = services.createUserUseCase;
    this.deleteUserUseCase = services.deleteUserUseCase;
    this.getAllUserUseCase = services.getAllUserUseCase;
    this.getUserByEmailUseCase = services.getUserByEmailUseCase;
    this.getUserByIdUseCase = services.getUserByIdUseCase;
    this.updateUserUseCase = services.updateUserUseCase;
  }

  async createUserController(req, res) {
    try {
      const userBody = req.body;

      if (!userBody) {
        throw new Error("There is no body in request.");
      }

      if (userBody.password.length < 6) {
        throw new Error("The password must have, at least, 6 characters.");
      }

      const foundUser = await this.getUserByEmailUseCase.execute(
        userBody.email
      );

      if (foundUser) {
        throw new Error("Email already exists in database.");
      }

      const newUser = await this.createUserUseCase.execute(userBody);

      if (!newUser) {
        throw new Error("Error creating user.");
      }

      res.status(200).send(newUser);
    } catch (err) {
      res.status(400).send({ message: "Error creating user. " + err });
    }
  }

  async deleteUserController(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new Error("There is no id in request.");
      }
      const deletedUser = await this.deleteUserUseCase.execute(userId);

      if (!deletedUser) {
        throw new Error("User not found to delete.");
      }

      res.status(200).send(deletedUser);
    } catch (err) {
      res.status(400).send({ message: "Error deleting user. " + err });
    }
  }

  async getAllUserController(req, res) {
    try {
      const userList = await this.getAllUserUseCase.execute();

      if (!userList) {
        throw new Error("There are no users to show.");
      }

      res.status(200).send(userList);
    } catch (err) {
      res.status(400).send({ message: "Error getting users. " + err });
    }
  }

  async getUserByEmailController(req, res) {
    try {
      const userEmail = req.params.email;

      if (!userEmail) {
        throw new Error("Invaid email in request.");
      }

      const foundUser = await this.getUserByEmailUseCase.execute(userEmail);

      if (!foundUser) {
        throw new Error("User not found.");
      }

      res.status(200).send(foundUser);
    } catch (err) {
      res.status(400).send({ message: "Error getting user. " + err });
    }
  }

  async getUserByIdController(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        throw new Error("Invaid email in request.");
      }

      const foundUser = await this.getUserByIdUseCase.execute(userId);

      if (!foundUser) {
        throw new Error("User not found.");
      }

      res.status(200).send(foundUser);
    } catch (err) {
      res.status(400).send({ message: "Error getting user. " + err });
    }
  }

  async updateUserController(req, res) {
    try {
      const userId = req.userId;
      const userBody = req.body;

      if (!userId || !userBody) {
        throw new Error("Incomplete request.");
      }

      if (userBody.password !== undefined && userBody.password) {
        if (userBody.password.length < 6) {
          throw new Error("The password must have, at least, 6 characters.");
        }
      }

      const foundUser = await this.getUserByIdUseCase.execute(userId);

      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        userBody,
        foundUser
      );

      if (!updatedUser) {
        throw new Error("User not updated.");
      }

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(400).send({ message: "Error updating user. " + err });
    }
  }
}
