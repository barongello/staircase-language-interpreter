'use strict';

// System libraries
const fs = require('fs');

// StairCase libraries
const { StairCaseInterpreter } = require('staircase-language');

if(process.argv.length !== 3) {
  console.error('Script called with wrong argument list');

  process.exit(1);
}

let sourceCodeLines = [];

try {
  const sourceCode = fs.readFileSync(process.argv[2]);
  let lineBreak = '\n';
  const lfIndex = sourceCode.indexOf('\n');
  const crIndex = sourceCode.indexOf('\r');

  if(sourceCode.length > 0) {
    if(lfIndex > -1 && crIndex > -1 && crIndex === lfIndex - 1) {
      lineBreak = '\r\n';
    }
    else if(lfIndex > - 1 && crIndex === -1) {
      lineBreak = '\n';
    }
    else if(lfIndex === -1 && crIndex > -1) {
      lineBreak = '\r';
    }
  }

  sourceCodeLines = sourceCode.toString().split(lineBreak);
}
catch(error) {
  console.error('Error reading the specified source file:');
  console.error(error);
}

const stairCaseInterpreter = new StairCaseInterpreter(sourceCodeLines);

try {
  stairCaseInterpreter.run();
}
catch(error) {
  console.error(error);
}
