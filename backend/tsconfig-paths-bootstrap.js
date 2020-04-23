const tsConfig = require('./paths.json');

const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './';
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
