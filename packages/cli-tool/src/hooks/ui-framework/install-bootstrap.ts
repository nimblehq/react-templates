import { cli } from 'cli-ux';
import * as fs from 'node:fs'
import runCommand from '../../helpers/child-process'

const hook = async function(options: {appName: string}): Promise<boolean> {
  return runCommand('cd', [`./${options.appName}`]).then(_value => {
    return runCommand('npm', [
      'install',
      'bootstrap@^5.1.3',
    ])
  }).then((_value) => addBootstrapFileStructure(options.appName))
};

const addBootstrapFileStructure = (appName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.cp(`./${appName}/.add-ons/bootstrap`, `./${appName}/src/assets/stylesheets/vendor/bootstrap`, (error)=> {
     if(error) {
       cli.error(error);
       reject()
       return
     }
     resolve(true)
    })
  })
  // Copy from template / add-ons / bootstrap

 // Replace "// Dependencies" by `// Dependencies \n@import 'vendor/bootstrap';` in application.scss
};

export default hook
