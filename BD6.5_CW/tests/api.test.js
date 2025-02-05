const request = require("supertest");
const {
  app,
  validateUser,
  validateBook,
  validateReview,
} = require("../index.js");
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
  it("should add new user with valid input ", async () => {
    const result = await request(server).post("/api/users").send({
      name: "John Doe",
      email: "johndoe@mail.com",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "John Doe",
      email: "johndoe@mail.com",
    });
  });
  //test 2
  it("should return 400 from invalid user input ", async () => {
    const result = await request(server)
      .post("/api/users")
      .send({ name: "John Doe" });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("email is required and should be a string.");
  });
  //test 3
  it("should add new book with valid input", async () => {
    const result = await request(server)
      .post("/api/books")
      .send({ title: "Moby Dick", author: "Herman Melville" });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      title: "Moby Dick",
      author: "Herman Melville",
    });
  });
  //test 4
  it("should return 400 from invalid book input", async () => {
    const result = await request(server)
      .post("/api/books")
      .send({ title: "Moby Dick" });

    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("author is required and should be a string.");
  });

  //test 5
  it("should add new review with valid input", async () => {
    const result = await request(server).post("/api/reviews").send({
      content: "Great book!",
      userId: 1,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({ id: 1, content: "Great book!", userId: 1 });
  });
  //test 6
  it("should return 400 from invalid review input", async () => {
    const result = await request(server)
      .post("/api/reviews")
      .send({ userId: 1 });

    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("content is required and should be a string.");
  });
});

describe("Validation functions", () => {
  //test 7
  it("should validate user input correctly", () => {
    expect(
      validateUser({
        name: "Alice",
        email: "alice@example.com",
      }),
    ).toBeNull();
    expect(validateUser({ name: "Alice" })).toEqual(
      "email is required and should be a string.",
    );

    expect(validateUser({ email: "alice@example.com" })).toEqual(
      "name is required and should be a string.",
    );
  });
  //test 8
  it("should validate book input correctly", () => {
    expect(
      validateBook({
        title: "Moby Dick",
        author: "Herman Melville",
      }),
    ).toBeNull();
    expect(validateBook({ title: "Moby Dick" })).toEqual(
      "author is required and should be a string.",
    );

    expect(validateBook({ author: "Herman Melville" })).toEqual(
      "title is required and should be a string.",
    );
    //test 9
  });
  it("should validate review input correctly", () => {
    expect(
      validateReview({
        content: "Great book!",
        userId: 1,
      }),
    ).toBeNull();
    expect(validateReview({ content: "Great book!" })).toEqual(
      "userId is required and should be a number.",
    );

    expect(validateReview({ userId: 1 })).toEqual(
      "content is required and should be a string.",
    );
  });
});
