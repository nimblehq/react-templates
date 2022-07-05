import fs from 'node:fs';

export type lineFinderFuncType = (lines: string[]) => number;
type matcherFuncType = (lines: string) => boolean;

/**
 *
 * @param {string} fileLocation - relative path to the file to edit
 * @param {Function} lineFinderFunction - takes the lines as array<string> as param
 * @param {Array<string>} linesToAdd - the lines that are going to be added at matching point
 * @returns void
 */
export function addLinesToFileAfterMatchedLine(
  fileLocation: string,
  lineFinderFunction: lineFinderFuncType,
  linesToAdd: string[],
): void {
  const fileContents = fs.readFileSync(fileLocation);
  const fileLines = fileContents.toString().split('\n');
  const lineIndex = lineFinderFunction(fileLines);
  // linesToAdd could be a string only, in that case we simply wrap it:
  const lines = Array.isArray(linesToAdd) ? linesToAdd : [linesToAdd];

  if (typeof lineIndex !== 'number') {
    throw new TypeError('lineIndex is not a number');
  }

  Array.prototype.splice.apply(fileLines, [
    lineIndex + 1, // starting point
    0, // delete ZERO entries
    ...lines,
  ]);

  fs.writeFileSync(fileLocation, fileLines.join('\n'));
}

export function getLastMatchedLineIndexFunction(
  matcherFunc: matcherFuncType,
): (lineByLineArray: string[]) => string {
  return function(lineByLineArray: string[]): string {
    const matchingLines = lineByLineArray.filter((item) => matcherFunc(item));

    return matchingLines[matchingLines.length - 1];
  };
}

export function getFirstMatchedLineIndexFunction(
  matcherFunc: matcherFuncType,
): (lineByLineArray: string[]) => string {
  return function(lineByLineArray: string[]): string {
    return lineByLineArray.find((item) => matcherFunc(item)) ?? '';
  };
}

export function replaceLine(
  fileLocation: string,
  matchLine: string,
  lineToReplace: string,
): void {
  const fileContent = fs.readFileSync(fileLocation);
  const newContent = fileContent.toString().replace(matchLine, lineToReplace);

  fs.writeFileSync(fileLocation, newContent);
}
