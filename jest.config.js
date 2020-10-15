module.exports = {
  verbose: true,
  roots: ["<rootDir>/src/components", "<rootDir>/specs/"],
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/components/$1',
  },
  transform: {
      "^.+\\.js$": 'babel-jest',
      "^.+\\.vue$": "vue-jest"
  },
  testURL: 'http://localhost/',
  snapshotSerializers: [
      "<rootDir>/node_modules/jest-serializer-vue"
  ]
}