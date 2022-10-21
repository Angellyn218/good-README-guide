const axios = require("axios");
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === 'no license') {
    return "";
  }

}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const licenses = [{key: 'mit', id: 'MIT License'}, {key: 'gpl-3.0', id: 'GNU GPLv3'}, {key: 'apache-2.0', id: 'Apache License 2.0'}, {key: 'isc', id: 'ISC License'}]

function renderLicenseLink(license) {
  if (license === 'no license') {
    return "";
  } else {
    fetchLicense(license);
  }
}

async function fetchLicense(license) {
  const key = findKey(license);
  const queryURL = `https://api.github.com/licenses/${key}`;
  axios
    .get(queryURL)
    .then(function(data) {
      console.log(data.data);
      makeLicense(data.data);
    });
}

// Render license file
function makeLicense(body) {
  console.log("make license");
}

function findKey(license) {
  console.log("find key");
  for (let i = 0; i < licenses.length; i++) {
    if (licenses[i].id === license) {
      return licenses[i].key;
    }
  }
  return "";
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === 'no license') {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log("Generated markdown!");
  renderLicenseLink(data.license);
  return `# ${data.title}
     
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
  
  If you have any questions, contact me using [${data.email}](${data.email}) or check my [github](https://github.com/${data.github}).
  `;
}

module.exports = generateMarkdown;
