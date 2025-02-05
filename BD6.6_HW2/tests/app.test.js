let request = require("supertest");
let http = require("http");
let { getAllGames, getGameById } = require("../controllers");
let { app } = require("../index");
const { describe } = require("node:test");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("Controller function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //test 1
  it("should return all games", () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    let result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  //test 2
  it("GET /games should get all games", async () => {
    const result = await request(server).get("/games");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    });
    expect(result.body.games.length).toBe(3);
  });
  //test 3
  it("GET /games/details/:id should get a game by id", async () => {
    const result = await request(server).get("/games/details/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});
