import chalk from "chalk";
import inquirer from "inquirer";

export function displayWelcome() {
  console.clear();

  console.log(chalk.cyan("================================"));
  console.log(chalk.bold("       WELCOME TO STUDYFLOW"));
  console.log(chalk.cyan("================================"));

  console.log("\nYour personal student task manager.");
  console.log("Organize your studies and stay productive.\n");
}

export async function displayMenu() {
  const answer = await inquirer.prompt([
    {
      type: "select",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Add a task",
        "View all tasks",
        "Complete a task",
        "Delete a task",
        "Exit",
      ],
    },
  ]);

  return answer.action;
}