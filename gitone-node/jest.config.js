/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  preset: "ts-jest",
  testEnvironment: "node",
};
