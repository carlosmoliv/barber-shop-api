import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  testRegex: ".integration.test.ts$",
  setupFiles: ["<rootDir>/src/test/setup.ts"],
};
