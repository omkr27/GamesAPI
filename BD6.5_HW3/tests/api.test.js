const request = require("supertest");
const { app, validateArticle, validateAuthor } = require("../index.js");
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
  it("should add new article with valid input ", async () => {
    const result = await request(server).post("/api/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });


  //test 2
  it("should return 400 from invalid article input ", async () => {
    const result = await request(server)
      .post("/api/articles")
      .send({ title: "Mastering Node.js" });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("content is required and should be a string.");
  });



  
  //test 3
  it("should add new authors with valid input", async () => {
    const result = await request(server).post("/api/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  
  //test 4
  it("should return 400 from invalid authors input", async () => {
    const result = await request(server)
      .post("/api/authors")
      .send({ name: "Alice Johnson" });

    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual(
      "articleId is required and should be a number.",
    );
  });
});

describe("Validation functions", () => {
  //test 7
  it("should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();
    expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
      "content is required and should be a string.",
    );

    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toEqual("title is required and should be a string.");
  });

  //test 8
  it("should validate article input correctly", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      }),
    ).toBeNull();
    expect(validateAuthor({ name: "Alice Johnson" })).toEqual(
      "articleId is required and should be a number.",
    );

    expect(validateAuthor({ articleId: 3 })).toEqual(
      "name is required and should be a string.",
    );
  });
});
