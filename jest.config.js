const SECONDS = 1000;
// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src/functions"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["dotenv/config"],
  testTimeout: 60 * SECONDS,
};
