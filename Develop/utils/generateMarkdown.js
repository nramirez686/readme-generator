function fetchLicense(licenseName) {
  const apiKey = "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";
  const url = `https://api.github.com/licenses/${licenseName}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const licenseData = {
        name: data.name,
        badge: data.spdx_id,
        link: data.html_url,
      };
      return licenseData;
    })
    .catch((error) => {
      console.error("Error fetching license data:", error);
      return "";
    });
}

function fetchLicenseNames() {
  const url = "https://api.github.com/licenses";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const licenseNames = data.map((license) => license.key);
      return licenseNames;
    })
    .catch((error) => {
      console.error("Error fetching license names:", error);
      return [];
    });
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(licenseData) {
  if (licenseData && licenseData.badge) {
    return `![License](https://img.shields.io/badge/License-${licenseData.badge}-blue.svg)`;
  } else {
    return "";
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(licenseData) {
  if (licenseData && licenseData.link) {
    return licenseData.link;
  } else {
    return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(licenseData) {
  if (licenseData && licenseData.name) {
    return `## License\n\nThis project is licensed under the [${licenseData.name}](${licenseData.link}) license.`;
  } else {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const licensePromise = fetchLicense(data.license);
  return licensePromise.then((licenseData) => {
    const licenseBadge = renderLicenseBadge(licenseData);
    const licenseLink = renderLicenseLink(licenseData);
    const licenseSection = renderLicenseSection(licenseData);

    return `# ${data.title}
  ${licenseBadge}

  ## Description

  ${data.projectDescription}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  
  ${licenseLink}
  
  ## Installation
  
  ${data.installationSteps}
  
  ## Usage
  
  ${data.usage}
  
  ## Credits
  
  ${data.credits}
  
  ${licenseSection}`;
  });
}

module.exports = { generateMarkdown, fetchLicenseNames, fetchLicense };
