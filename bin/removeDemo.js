// This script removes demo app files
import rimraf from 'rimraf';
import fs from 'fs';
import {chalkSuccess} from './chalkConfig';

import ReducerTemplate from './templates/reducer';
import ConfigTemplate from './templates/config';

const pathsToRemove = [
  './src/actions/*',
  './src/utils',
  './src/components/*',
  './src/constants/*',
  './src/containers/*',
  './src/images',
  './src/reducers/*',
  './src/screens/*',
  './src/store/store.spec.js',
  './src/styles',
  './src/types',
  './bin/templates',
  './bin/removeDemo.js'
];

const filesToCreate = [
  {
    path: './src/reducers/index.js',
    content: ReducerTemplate
  },
  {
    path: './src/config/index.js',
    content: ConfigTemplate
  }
];

const pathsToCreate = [
  './src/adapters',
  './src/containers',
  './src/helpers',
  './src/lib',
  './src/screens',
  './src/services'
];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
  });
}

function createFile(file) {
  fs.writeFile(file.path, file.content, error => {
    if (error) throw new Error(error);
  });
}

function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = './package.json';
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath,
    JSON.stringify(content, null, 2) + '\n');
}

let numPathsRemoved = 0;
pathsToRemove.map(path => {
  removePath(path, () => {
    numPathsRemoved++;
    if (numPathsRemoved === pathsToRemove.length) { // All paths have been processed
      // Now we can create files since we're done deleting.
      filesToCreate.map(file => createFile(file));
    }
  });
  
  // Create standard React-Redux folders
  pathsToCreate.map(dir => {
    !fs.existsSync(dir) && fs.mkdirSync(dir);
  });
});

removePackageJsonScriptEntry('remove-demo');

console.log(chalkSuccess('Demo app removed.'));
