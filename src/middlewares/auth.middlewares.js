import jwt from "jsonwebtoken";

export class AuthMiddlewares {
  constructor(services) {
    this.services = services;
  }

  verifyToken(req, res, next) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new Error("The token was not informed.");
      }

      const split = authorization.split(" ");

      if (!split || split[0] !== "Bearer" || split.length !== 2) {
        throw new Error("Invalid token.");
      }

      jwt.verify(split[1], process.env.SECRET, async (err, decoded) => {
        try {
          if (err) {
            throw new Error("Invalid token.");
          }

          const user = await this.services.getUserByIdUseCase.execute(
            decoded.id
          );

          if (!user || !user.id) {
            throw new Error("Invalid token.");
          }

          req.userId = user.id;

          return next();
        } catch (err) {
          return res
            .status(400)
            .send({ message: "Authentication error. " + err });
        }
      });
    } catch (err) {
      return res.status(400).send({ message: "Authentication error. " + err });
    }
  }
}
