import * as fs from 'node:fs'

import {cli} from 'cli-ux'

import runCommand from '../../helpers/child-process'
import {
  addLinesToFileAfterMatchedLine,
  lineFinderFuncType,
} from '../../helpers/file-editor'

// Copy from template / add-ons / bootstrap
const addBootstrapFileStructure = (appName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      cli.info('Starting: ', `./${appName}/.add-ons/bootstrap`)
      const destPath = `./${appName}/src/assets/stylesheets/vendor/bootstrap/`

      fs.renameSync(`./${appName}/.add-ons/bootstrap/`, destPath)
      resolve(true)
    } catch (error) {
      cli.info(
        'Error while copying vendor files for Bootstrap:',
        error as string,
      )
      reject()
    }
  })
}

const bootstrapImportLocationFinder: lineFinderFuncType = (
  lines: string[],
): number => {
  return lines.indexOf('// Dependencies')
}

// In index.scss, Replace "// Dependencies" by `// Dependencies \n@import 'vendor/bootstrap';` in application.scss
const addBootstrapScssUseLine = (appName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const indexScssPath = `./${appName}/src/assets/stylesheets/application.scss`
      const lineToAdd = `@use 'src/assets/stylesheets/vendor/bootstrap';`
      cli.info('Insert bootstrap scss import using: ', indexScssPath)

      addLinesToFileAfterMatchedLine(
        indexScssPath,
        bootstrapImportLocationFinder,
        [lineToAdd],
      )

      resolve(true)
    } catch (error) {
      cli.info(
        'Error while adding the bootstrap lib import in index.scss:',
        error as string,
      )
      reject()
    }
  })
}

const installNpmPackage = (appName: string): Promise<boolean> => {
  return runCommand('npm', ['install', 'bootstrap@^5.1.3'], `./${appName}/`)
}

const hook = async function({
  appName,
}: {
  appName: string;
}): Promise<boolean> {
  return installNpmPackage(appName)
    .then(_value => addBootstrapFileStructure(appName))
    .then(_value => addBootstrapScssUseLine(appName))
}

export default hook
