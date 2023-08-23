module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$"
  ],
  "transform": {
    "^.+\\.(js|jsx)?$": "babel-jest"
  }
,
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy",
    axios: 'axios/dist/node/axios.cjs'
  }
};