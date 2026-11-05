import chalk from "chalk";
import { parseArgs } from "node:util";
import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "./tasks.js";
import { getQuote } from "./api/api.js";

async function run() {
  const { positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    strict: false,
  });

  const [command, ...argumentsList] = positionals;

  try {
    switch (command) {
      case "add": {
        const title = argumentsList.join(" ");

        if (!title) throw new Error("Please provide a task title.");

        const task = addTask(title);
        console.log(chalk.green(`Task added: ${task.title}`));
        break;
      }

      case "list": {
        const tasks = getTasks();

        if (tasks.length === 0) {
          console.log(chalk.yellow("No tasks found."));
          break;
        }

        console.log(chalk.bold("\nYOUR STUDY TASKS\n"));

        tasks.forEach((task) => {
          const status = task.completed ? "Completed" : "Pending";
          console.log(
            `${task.id} | ${task.title} | ${task.completed ? chalk.green(status) : chalk.yellow(status)}`,
          );
        });
        break;
      }

      case "complete": {
        const success = completeTask(argumentsList[0]);

        if (!success) throw new Error("Task ID not found.");

        console.log(chalk.green("Task completed successfully."));
        break;
      }

      case "delete": {
        const success = deleteTask(argumentsList[0]);

        if (!success) throw new Error("Task ID not found.");

        console.log(chalk.green("Task deleted successfully."));
        break;
      }

      case "quote": {
        console.log(chalk.yellow("Fetching a motivational quote..."));
        const result = await getQuote();

        console.log(chalk.italic(`"${result.quote}"`));
        console.log(chalk.dim(`— ${result.author}`));
        break;
      }

      default:
        console.log(chalk.bold("\nSTUDYFLOW CLI"));
        console.log("add <title>       Add a task");
        console.log("list              View tasks");
        console.log("complete <id>     Complete a task");
        console.log("delete <id>       Delete a task");
        console.log("quote             Get a motivational quote");
        console.log("help              Show commands");
    }
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exitCode = 1;
  }
}

run();