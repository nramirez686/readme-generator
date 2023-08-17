// Included packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const fs = require("fs");

//Created an array of questions for user input
const questions = [
  {
    question: "What is the name of your project?",
    heading: "Title",
    input: "title",
  },
  {
    question: "Describe you project",
    heading: "Project Description",
    input: "projectDescription",
  },
  {
    question: "What are the steps required to install your project?",
    heading: "Installation",
    input: "installationSteps",
  },
  {
    question: "How do you use your project?",
    heading: "Usage",
    input: "usage",
  },
  {
    question:
      "Did you have any collaborators, third party assets or any tutorials you followed?",
    heading: "Credits",
    input: "credits",
  },
];

//Created a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (error) => {
    if (err) {
      console.log(error);
    } else {
      console.log("README file had been created");
    }
  });
}
// Created a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    writeToFile("README.md, markdown");
  });
}
//Function call to initialize app
init();
