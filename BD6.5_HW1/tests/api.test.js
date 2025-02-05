const request = require("supertest");
const { app, validateGame, validateTournament } = require("../index.js");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  //test 1
  it("should add new game with valid input ", async () => {
    const result = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });
  //test 2
  it("should return 400 from invalid game input ", async () => {
    const result = await request(server)
      .post("/api/games")
      .send({ title: "The Legend of Zelda" });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("genre is required and should be a string.");
  });
  //test 3
  it("should add new tournament with valid input", async () => {
    const result = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });
  //test 4
  it("should return 400 from invalid tournament input", async () => {
    const result = await request(server)
      .post("/api/tournaments")
      .send({ name: "Zelda Championship" });

    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("gameId is required and should be a number.");
  });
});

describe("Validation functions", () => {
  //test 7
  it("should validate game input correctly", () => {
    expect(
      validateGame({
        title: "The Legend of Zelda",
        genre: "Adventure",
      }),
    ).toBeNull();
    expect(validateGame({ title: "The Legend of Zelda" })).toEqual(
      "genre is required and should be a string.",
    );

    expect(validateGame({ genre: "Adventure" })).toEqual(
      "title is required and should be a string.",
    );
  });

  //test 8
  it("should validate tournament input correctly", () => {
    expect(
      validateTournament({
        name: "Zelda Championship",
        gameId: 1,
      }),
    ).toBeNull();
    expect(validateTournament({ name: "Zelda Championship" })).toEqual(
      "gameId is required and should be a number.",
    );

    expect(validateTournament({ gameId: 1 })).toEqual(
      "name is required and should be a string.",
    );
  });
});
