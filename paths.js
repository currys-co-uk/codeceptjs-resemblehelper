const path = require('path');

const workingDir = process.cwd();

module.exports.paths = {
  appDir: workingDir,
  appVsCode: path.join(workingDir, '.vscode'),

  appTsConfig: path.join(workingDir, 'tsconfig.json'),
  appPackageJson: path.join(workingDir, 'package.json'),
};
