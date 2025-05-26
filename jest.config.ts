import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", __dirname],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: "./tsconfig.jest.json", isolatedModules: true },
    ],
  },
  transformIgnorePatterns: ["node_modules"],

  // Coverage settings.
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/exports.ts",
    "!src/theme/index.ts",
    "!src/theme/sampleData.ts",
    "!src/theme/themeNavItems.tsx",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 40,
      lines: 50,
      statements: 50,
    },
  },
};

export default jestConfig;
