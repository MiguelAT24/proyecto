module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '\\.(scss|sass|css)$': 'identity-obj-proxy',
      testEnvironment: 'jest-environment-jsdom',
      setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
      
    },
  };
  