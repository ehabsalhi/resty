module.exports = {
     transform: {
       '^.+\\.[jt]sx?$': 'babel-jest'
     },
     testEnvironment: 'jsdom',
     moduleDirectories: ['node_modules', 'src'],
     moduleNameMapper: {
       '\\.(css|scss)$': 'identity-obj-proxy'
     }
   };