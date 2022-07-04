import * as fs from 'node:fs'

import {cli} from 'cli-ux'

import runCommand from '../../helpers/child-process'

// Copy from template / add-ons / bootstrap
const addBootstrapFileStructure = (appName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      cli.info('Starting: ', `./${appName}/.add-ons/bootstrap`)
      const destPath = `./${appName}/src/assets/stylesheets/vendor/bootstrap/`;

      fs.renameSync(`./${appName}/.add-ons/bootstrap/`, destPath);
      resolve(true)
    }
    catch (error: any){
      cli.info("PAAAAAF")
      cli.info("Error while copying vendor files for Bootstrap:", error)
      reject()
    }
  })
}

// In index.scss, Replace "// Dependencies" by `// Dependencies \n@import 'vendor/bootstrap';` in application.scss
const addBootstrapImportLine = (appName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      // TODO
      // TODO
      // TODO
    }
    catch (error: any){
      cli.info("Error while adding the bootstrap lib import in index.scss:", error)
      reject()
    }
  })
}

const hook = async function(options: {appName: string}): Promise<boolean> {
  return runCommand('npm', [
    'install',
    'bootstrap@^5.1.3',
  ]).then(_value => addBootstrapFileStructure(options.appName))
  .then(_value => addBootstrapImportLine(options.appName))
}

export default hook
