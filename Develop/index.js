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
        name: "description",
        message: "description",
      },
      {
        type: "input",
        name: "installationSteps",
        message: "What are the steps required to install your project?",
      },
      {
        type: "input",
        name: "usage",
        message: "How do you use you project?",
      },
      {
        type: "input",
        name: "credits",
        message:
          "Did you have any collaborators, third party assets or any tutorials you followed?",
      },
      {
        type: "list",
        name: "license",
        message: "What license did you use?",
        choices: licenseChoices,
      },
      {
        type: "input",
        name: "questions",
        message: "Enter your email address",
      },
      {
        type: "input",
        name: "username",
        message: "Enter GitHub username",
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
    // Created a function to initialize app with user inputs
    function init() {
      inquirer.prompt(questions).then((answers) => {
        console.log("answers:", answers);
        const data = {
          title: answers.title,
          description: answers.description,
          installationSteps: answers.installationSteps,
          usage: answers.usage,
          credits: answers.credits,
          license: answers.license,
          email: answers.questions,
          username: answers.username,
        };
        fetchLicense(answers.license)
          .then((licenseData) => {
            console.log("License Data:", licenseData);
            answers.licenseData = licenseData;
            return generateMarkdown(answers); // Return the promise to the next `.then`
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
