// Included packages needed for this application
const inquirer = require("inquirer");
const {
  generateMarkdown,
  fetchLicenseNames,
  fetchLicense,
} = require("./utils/generateMarkdown");
const fs = require("fs");
//fetch the licenses from github
fetchLicenseNames()
  .then((licenses) => {
    const licenseChoices = licenses.concat(["None"]);
    const questions = [
      {
        type: "input",
        name: "title",
        message: "What is the name of your project?",
      },
      {
        type: "input",
        name: "title",
        message: "Project Description",
      },
      {
        type: "input",
        name: "installation steps",
        message: "What are the steps required to install your project?",
      },
      {
        type: "input",
        name: "Usage",
        message: "How do you use you project?",
      },
      {
        type: "input",
        name: "Credits",
        message:
          "Did you have any collaborators, third party assets or any tutorials you followed?",
      },
      {
        type: "list",
        name: "License",
        message: "What license did you use?",
        choices: licenseChoices,
      },
    ];

    //Created a function to write README file
    function writeToFile(fileName, data) {
      fs.writeFile(fileName, data, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("README file had been created");
        }
      });
    }
    // Created a function to initialize app
    function init() {
      let licenseData;
      inquirer.prompt(questions).then((answers) => {
        fetchLicense(answers.license)
          .then((licenseData) => {
            answers.licenseData = licenseData;
            const markdownPromise = generateMarkdown(answers);
            return markdownPromise; // Return the promise to the next `.then`
          })
          .then((markdown) => {
            writeToFile("README.md", markdown);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }

    //Function call to initialize app
    init();
  })
  .catch((error) => {
    console.error("Error fetching license names:", error);
  });
