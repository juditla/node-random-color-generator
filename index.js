import { argv } from 'node:process';
import chalk from 'chalk';
import randomColor from 'randomcolor';

let outputColor;
let output;
let width = 31;
let height = 9;
checkInput();

function checkInput() {
  // check if the input matches the format WWxHH
  if (argv[2] && argv[2].match(/[0-9]{1,2}x|X[0-9]{1,2}/)) {
    width = Number(argv[2].slice(0, 2));
    height = Number(argv[2].slice(3, 5));
    outputColor = randomColor({
      hue: argv[3],
      luminosity: argv[4],
    });
  } else {
    // assigns first and second arguments to hue and luminosity respecitvely
    outputColor = randomColor({
      hue: argv[2],
      luminosity: argv[3],
    });
  }
  // check if input is 'ask'
  if (argv[2] === 'ask') {
    console.log(
      'Please give me the name of a color (inluding luminosity - dark/light - if you want',
    );
  } else {
    createRectangle(width, height);
  }
}

function createRectangle(columns = 31, rows = 9) {
  for (let i = 0; i < rows; i++) {
    output = '';
    // calls function to fill the rectangle depending on row to create blank space in the middle
    if (i === Math.floor(rows / 2)) {
      fillRectangle(width, 'middle');
    } else if (
      i === Math.floor(rows / 2) - 1 ||
      i === Math.floor(rows / 2) + 1
    ) {
      fillRectangle(columns, 'blank');
    } else {
      fillRectangle(columns, 'hashes');
    }
    // Logs out the created rectangle with designated color
    console.log(chalk.hex(outputColor)(output));
  }
}

function fillRectangle(columns, string) {
  for (let j = 0; j < columns; j++) {
    if (j > 3 && j < columns - 4) {
      // create blank space in the three middle rows
      if (string === 'blank') {
        output += ' ';
      } else if (string === 'middle') {
        if (j === Math.floor(columns / 2 - 3)) {
          // fill in the used hexcode in the center of the rectangle in the middle row
          output += outputColor;
          j += 6;
        } else {
          // fill the rest of the middle row with blank space
          output += ' ';
        }
      } else {
        // fills the space for the outer lines with hashtags
        output += '#';
      }
    } else {
      // fills the first and last four spaces with hashtags
      output += '#';
    }
  }
}
