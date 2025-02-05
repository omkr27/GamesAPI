const request = require("supertest");
const { app, validateEmployee, validateCompany } = require("../index.js");
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
  it("should add new employee with valid input ", async () => {
    const result = await request(server).post("/api/employees").send({
      name: "John Doe",
      companyId: 1,
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({ id: 1, name: "John Doe", companyId: 1 });
  });
  //test 2
  it("should return 400 from invalid employee input ", async () => {
    const result = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe" });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual(
      "companyId is required and should be a number.",
    );
  });
  //test 3
  it("should add new company with valid input", async () => {
    const result = await request(server).post("/api/companies").send({
      name: "TechCorp",
    });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });
  //test 4
  it("should return 400 from invalid company input", async () => {
    const result = await request(server)
      .post("/api/companies")
      .send({ name: 34 });

    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("name is required and should be a string.");
  });
  describe("Validation functions", () => {
    //test 5
    it("should validate employee input correctly", () => {
      expect(
        validateEmployee({
          name: "John Doe",
          companyId: 1,
        }),
      ).toBeNull();
      expect(validateEmployee({ name: "John Doe" })).toEqual(
        "companyId is required and should be a number.",
      );

      expect(validateEmployee({ companyId: 1 })).toEqual(
        "name is required and should be a string.",
      );
    });

    //test 6
    it("should validate company input correctly", () => {
      expect(
        validateCompany({
          name: "TechCorp",
        }),
      ).toBeNull();
      expect(validateCompany({ name: 45 })).toEqual(
        "name is required and should be a string.",
      );
    });
  });
});
