export default {
  preset: 'ts-jest',
  setupFiles: ["whatwg-fetch"],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
