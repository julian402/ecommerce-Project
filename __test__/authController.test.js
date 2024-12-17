import request from "supertest";
import app from "../server.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { describe, expect, jest } from "@jest/globals";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth Controller Tests", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return a token when credentials are valid", async () => {
    const mockUser = {
      _id: "1",
      email: "test@example.com",
      password: "hashedPassword*",
    };

    User.findOne = jest.fn().mockResolvedValue(mockUser);

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue("fakeToken");

    const response = await request(app).post("/api/login").send({
      email: "test@example.com",
      password: "password123*",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("fakeToken");
  });

  it("should return 401 when credentials are invalid", async () => {
    const mockUser = {
      _id: "1",
      email: "test@example.com",
      password: "hashedPassword*",
    };

    User.findOne = jest.fn().mockResolvedValue(mockUser);

    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const response = await request(app).post("/api/login").send({
      email: "test@example.com",
      password: "wrongPassword*",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid Credentials");
  });

  it("should return 500 when there is a server error", async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/api/login").send({
      email: "test@example.com",
      password: "password123*",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Server Error");
  });
});
