const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

function generateSVG(shape, text, textColor) {
  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
  `.trim();
}

async function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => input.length <= 3 || 'Please enter up to three characters.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);
}

async function run() {
  const answers = await promptUser();
  
  let shape;
  switch (answers.shape) {
    case 'triangle':
      shape = new Triangle();
      break;
    case 'circle':
      shape = new Circle();
      break;
    case 'square':
      shape = new Square();
      break;
  }
  
  shape.setColor(answers.shapeColor);
  
  const svgContent = generateSVG(shape, answers.text, answers.textColor);
  
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
}

run();
