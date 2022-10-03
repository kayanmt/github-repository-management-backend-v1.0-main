export class RepoController {
  constructor(services) {
    this.createRepoUseCase = services.createRepoUseCase;
    this.deleteRepoUseCase = services.deleteRepoUseCase;
    this.getAllRepoUseCase = services.getAllRepoUseCase;
    this.updateRepoUseCase = services.updateRepoUseCase;
  }

  async createRepoController(req, res) {
    try {
      const userId = req.userId;
      const repoBody = req.body;

      if (!repoBody || !userId) {
        throw new Error("Invalid request.");
      }

      const foundRepo = await this.getAllRepoUseCase.execute(userId);
      const filtered = foundRepo.filter((i) => i.name === repoBody.name);
      if (filtered.length > 0) {
        throw new Error("Repository already exists.");
      }

      const newRepo = await this.createRepoUseCase.execute(userId, repoBody);

      if (!newRepo) {
        throw new Error("Error in creation.");
      }

      res.status(200).send(newRepo);
    } catch (err) {
      res.status(400).send({ message: "Error creating repository. " + err });
    }
  }

  async deleteRepoController(req, res) {
    try {
      const userId = req.userId;
      const repoName = req.params.name;

      if (!userId || !repoName) {
        throw new Error("Invalid id or name in request.");
      }

      const foundRepo = await this.getAllRepoUseCase.execute(userId);
      const filtered = foundRepo.filter((i) => i.name === repoName);
      if (filtered.length === 0) {
        throw new Error("Repository not found.");
      }

      const deletedRepo = await this.deleteRepoUseCase.execute(
        userId,
        repoName
      );

      if (!deletedRepo) {
        throw new Error("Repository not found to delete.");
      }

      res.status(200).send(deletedRepo);
    } catch (err) {
      res.status(400).send({ message: "Error deleting repository. " + err });
    }
  }

  async getAllRepoController(req, res) {
    try {
      const userId = req.userId;

      if (!userId) {
        throw new Error("Invalid id in request.");
      }

      const repoList = await this.getAllRepoUseCase.execute(userId);

      if (!repoList) {
        throw new Error("Repository list is empty.");
      }

      res.status(200).send(repoList);
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error getting repository list. " + err });
    }
  }

  async updateRepoController(req, res) {
    try {
      const userId = req.userId;

      const nameRepo = req.params.name;

      const repoBody = req.body;

      if (!userId || !repoBody || !nameRepo) {
        throw new Error("Invalid request.");
      }

      const foundRepo = await this.getAllRepoUseCase.execute(userId);
      const filtered = foundRepo.filter((i) => i.name === nameRepo);
      if (filtered.length == 0) {
        throw new Error("Repository not found.");
      }

      const finalBody = Object.assign(filtered[0], repoBody)

      const updatedRepo = await this.updateRepoUseCase.execute(
        userId,
        nameRepo,
        finalBody,
      );

      if (!updatedRepo) {
        throw new Error("Repository not found to update.");
      }

      res.status(200).send(updatedRepo);
    } catch (err) {
      res.status(400).send({ message: "Error updating repository: " + err });
    }
  }
}
