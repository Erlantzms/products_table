module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '\\.(svg)$':  "./svgTransform.js"
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
  };