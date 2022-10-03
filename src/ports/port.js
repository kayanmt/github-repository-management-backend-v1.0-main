export class Port {
  static portConnect(app) {
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Running at port ${port}`);
    });
  }
}
