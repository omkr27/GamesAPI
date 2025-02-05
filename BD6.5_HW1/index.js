let express = require("express");
let app = express();
app.use(express.json());

let games = [];
let tournaments = [];

function validateGame(game) {
  if (!game.title || typeof game.title !== "string") {
    return "title is required and should be a string.";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "genre is required and should be a string.";
  }

  return null;
}

app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  if (error) return res.status(400).send(error);

  let game = { id: games.length + 1, ...req.body };
  games.push(game);
  return res.status(201).json(game);
});

function validateTournament(tournament) {
  if (!tournament.name || typeof tournament.name !== "string") {
    return "name is required and should be a string.";
  }
  if (!tournament.gameId || typeof tournament.gameId !== "number") {
    return "gameId is required and should be a number.";
  }

  return null;
}

app.post("/api/tournaments", (req, res) => {
  let error = validateTournament(req.body);
  if (error) return res.status(400).send(error);

  let tournament = { id: tournaments.length + 1, ...req.body };
  tournaments.push(tournament);
  return res.status(201).json(tournament);
});

module.exports = {
  app,
  validateGame,
  validateTournament,
};
