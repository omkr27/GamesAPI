let cors = require("cors");
let express = require("express");
const { getAllGames, getGameById } = require("./controllers");
let app = express();

app.use(cors());
app.use(express.json());

app.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  const game = await getGameById(parseInt(req.params.id));
  res.json({ game });
});

module.exports = {
  app,
};
