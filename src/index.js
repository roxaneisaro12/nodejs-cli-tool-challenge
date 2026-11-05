import chalk from "chalk";
import { displayWelcome, displayMenu } from "./ui.js";

async function startApp() {
  displayWelcome();

  let isRunning = true;

  while (isRunning) {
    const action = await displayMenu();

    switch (action) {
      case "Add a task":
        console.log(chalk.yellow("\nAdd task feature coming next!"));
        break;

      case "View all tasks":
        console.log(chalk.yellow("\nView tasks feature coming next!"));
        break;

      case "Complete a task":
        console.log(chalk.yellow("\nComplete task feature coming next!"));
        break;

      case "Delete a task":
        console.log(chalk.yellow("\nDelete task feature coming next!"));
        break;

      case "Exit":
        console.log(chalk.green("\nThank you for using StudyFlow!"));
        isRunning = false;
        break;
    }
  }
}

startApp();