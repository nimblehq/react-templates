import * as fs from 'node:fs'
import path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..')
const TEMPLATE_DIR =
  process.env.NODE_ENV === 'development' ? 'externsions' : 'dist/externsions'
const TEMPLATE_PATH = path.join(ROOT_DIR, TEMPLATE_DIR)

const getTargetPath = (file: string): string => {
  const targetPath = process.cwd()

  return path.join(targetPath, file)
}

const copyFile = (source: string, target: string): void => {
  const sourcePath = path.join(TEMPLATE_PATH, source)
  const targetPath = getTargetPath(target)
  const targetDir = path.dirname(targetPath)
  const targetExists = fs.existsSync(targetPath)
  if (!targetExists) {
    fs.mkdirSync(targetDir, {recursive: true})
  }

  fs.copyFileSync(sourcePath, targetPath)
}

const copyDir = (source: string, target: string): void => {
  const sourcePath = path.join(TEMPLATE_PATH, source)
  const targetPath = getTargetPath(target)
  const targetExists = fs.existsSync(targetPath)
  if (!targetExists) {
    fs.mkdirSync(targetPath, {recursive: true})
  }

  const files = fs.readdirSync(sourcePath)
  for (const file of files) {
    const sourceFile = path.join(source, file)
    const targetFile = path.join(target, file)
    if (fs.lstatSync(path.join(TEMPLATE_PATH, sourceFile)).isDirectory()) {
      copyDir(sourceFile, targetFile)
    } else {
      copyFile(sourceFile, targetFile)
    }
  }
}

export {copyDir, copyFile}
