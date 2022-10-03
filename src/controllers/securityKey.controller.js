import bcrypt from "bcryptjs";

export class SecurityKeyController {
  constructor(services) {
    this.createSecurityKeyUseCase = services.createSecurityKeyUseCase;
    this.getAllSecurityKeyUseCase = services.getAllSecurityKeyUseCase;
    this.editPasswordByEmailUseCase = services.editPasswordByEmailUseCase;
  }

  async createSecurityKeyController(req, res) {
    try {
      const userEmail = req.body.email;
      const keysBody = req.body.keys;

      if (!userEmail || !keysBody) {
        throw new Error("Invalid request.");
      }

      if (keysBody.length !== 3) {
        throw new Error("Create 3 security keys.");
      }

      if (keysBody[0] === keysBody[1] || keysBody[1] === keysBody[2]) {
        throw new Error("The keys must be different.");
      }

      const foundKeys = await this.getAllSecurityKeyUseCase.execute(userEmail);

      if (foundKeys.length === 3) {
        throw new Error("Security keys already registered for this id.");
      }

      const newKeys = await this.createSecurityKeyUseCase.execute(userEmail, [
        ...keysBody,
      ]);

      if (!newKeys) {
        throw new Error("Error in creating security keys.");
      }

      res.status(200).send(newKeys);
    } catch (err) {
      res.status(400).send({ message: "Error creating security keys. " + err });
    }
  }

  async getAllSecurityKeyReferencesController(req, res) {
    try {
      const userEmail = req.body.email;

      if (!userEmail) {
        throw new Error("Invalid id in request.");
      }

      const refList = await this.getAllSecurityKeyUseCase
        .execute(userEmail)
        .then((data) => data.map((item) => item.reference));

      if (!refList) {
        throw new Error("Security key reference list is empty.");
      }

      res.status(200).send(refList);
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error getting secutity key reference list. " + err });
    }
  }

  async editPasswordByEmailController(req, res) {
    try {
      const userEmail = req.body.email;
      const newPassword = req.body.password;
      const keys = req.body.keys;

      if (!userEmail || !newPassword || !keys) {
        throw new Error("Missing fields in request.");
      }

      if(newPassword.length < 6){
        throw new Error("The password must have, at least, 6 characters.");
      }

      if (keys[0] === keys[1] || keys[1] === keys[2]) {
        throw new Error("The keys must be different.");
      }

      const foundKeys = await this.getAllSecurityKeyUseCase
        .execute(userEmail)
        .then((data) => data.map((item) => item.key));

      if (!foundKeys) {
        throw new Error("Security keys not found for this email.");
      }

      for (let key of keys) {
        let count = 0;

        for (let foundKey of foundKeys) {
          if (bcrypt.compareSync(key, foundKey) === true) {
            count++;
          }
        }
        if (count === 0) {
          throw new Error("Wrong key(s).");
        }
      }

      const editedUser = await this.editPasswordByEmailUseCase.execute(
        userEmail,
        bcrypt.hashSync(newPassword, 10)
      );

      if (!foundKeys) {
        throw new Error("User not found.");
      }

      res.status(200).send(editedUser);
    } catch (err) {
      res
        .status(400)
        .send({ message: "There was an error updating password. " + err });
    }
  }
}
