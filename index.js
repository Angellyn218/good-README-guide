// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [{ // Title
    type: 'input',
    name: 'title',
    message: "What is your repo's title?"
}, { // Description
    type: 'input',
    name: 'description',
    message: "What is the description for your repo?"
}, { // Installation
    type: 'input',
    name: 'installation',
    message: "How do you install your repo?"
}, { // Usage
    type: 'input',
    name: 'usage',
    message: "How can your repo be used?"
}, { // License
    type: 'list',
    name: 'license',
    message: "What is type of license do you want your repo to have?",
    choices: ["MIT License", "GNU GPLv3", "Apache License 2.0", "ISC License", "no license"]
}, { // Contributing
    type: 'input',
    name: 'contributing',
    message: "How can others contribute to your repo?"
}, { // Tests
    type: 'input',
    name: 'tests',
    message: "What are the tests that are contained within your repo?"
}, { // Github username
    type: 'input',
    name: 'github',
    message: "What is your Github username?"
}, { // Github repo name
    type: 'input',
    name: 'repo',
    message: "What is †he name of the repo that this readme will belong to?"
}, { // email
    type: 'input',
    name: 'email',
    message: "What is your email?"
}];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
    const dataStr = `# ${data.title}
     
## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Badges](#badges)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## License

Please refer to LICENSE in this repository

## Contributing

${data.contributing}

## Tests

${data.tests}

## Badges

add based on repo

## Questions

If you have any questions, contact me ${data.email} or check my github 
`;
    fs.writeFile(fileName, dataStr, (err) =>
    err ? console.log(err) : console.log('Successfully created README!'));
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        // prompts: Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
        .prompt(questions)
        .then((answers => writeToFile("GENERATED-README.md", answers)));
}

// Function call to initialize app
init();
