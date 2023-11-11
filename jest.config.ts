export default {
  preset: 'ts-jest',
  setupFiles: ["whatwg-fetch"],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
