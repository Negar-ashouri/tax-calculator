const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
};