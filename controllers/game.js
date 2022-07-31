var Player = require("../models/Player");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("layout");
  });

  app.post("/signup", (req, res) => {
    const { email, fullName, phone, wallet } = req.body;
    if (!email || !fullName || !phone || !wallet) {
      res.json({ result: 0, error: "Missing params" });
    } else {
      var newPlayer = new Player({
        email,
        fullName,
        phone,
        paid: false,
        wallet,
        date: Date.now(),
      });

      newPlayer.save(function (err) {
        if (err) {
          res.json({ result: 0, error: "Mongodb save error" });
        } else {
          res.json({ result: 1, error: newPlayer });
        }
      });
    }
  });

  app.get("/players", async (req, res) => {
    try {
      const players = await Player.find();

      res.status(200).json({ data: players });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
};
