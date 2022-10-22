const axios = require("axios");
const fs = require('fs');
// Returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === 'no license') {
    return "";
  } else {
    let licenseStr = license.split(" ").join("%20");
    return `https://img.shields.io/badge/license-${licenseStr}-green`
  }

}

// Returns the license link
// If there is no license, return an empty string
const licenses = [{key: 'mit', id: 'MIT License'}, {key: 'gpl-3.0', id: 'GNU GPLv3'}, {key: 'apache-2.0', id: 'Apache License 2.0'}, {key: 'isc', id: 'ISC License'}]

function renderLicenseLink(license) {
  if (license === 'no license') {
    return "";
  } else {
    const key = findKey(license);
    fetchLicense(key);
    return `http://choosealicense.com/licenses/${key}/`;
  }
}

// fetch body of licnse using axios
async function fetchLicense(key) {
  const queryURL = `https://api.github.com/licenses/${key}`;
  axios
    .get(queryURL)
    .then(function(data) {
      makeLicense(data.data.body);
    });
}

// Render license file
function makeLicense(body) {
  fs.writeFile("./product/LICENSE", body, (err) =>
    err ? console.log(err) : console.log('Successfully created LICENSE!'));

}

// find key for given license
function findKey(license) {
  for (let i = 0; i < licenses.length; i++) {
    if (licenses[i].id === license) {
      return licenses[i].key;
    }
  }
  return "";
}

// Returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === 'no license') {
    return `This repository has no license.`;
  } else {
    const link = renderLicenseLink(license);
    return `Please refer to [LICENSE](./LICENSE) in this repository. For more information on this license, see the [link](${link}).`
  }
}

// Generate markdown for README
function generateMarkdown(data) {
  const licenseSect = renderLicenseSection(data.license);
  const badge = renderLicenseBadge(data.license);
  return `# ${data.title}
     
  ## Description

  ${data.description}

  ![badmath](${badge})
  
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

  ${licenseSect}
  
  ## Contributing
  
  ${data.contributing}
  
  ## Tests
  
  ${data.tests}
  
  ## Questions
  
  If you have any questions, contact me through [${data.email}](${data.email}) or check my [github](https://github.com/${data.github}).
  `;
}

module.exports = generateMarkdown;
