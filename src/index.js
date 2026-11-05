import chalk from "chalk";
import Table from "cli-table3";
import ora from "ora";
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

  const [command, ...args] = positionals;

  try {
    switch (command) {
      case "add": {
        const title = args.join(" ");
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

        const table = new Table({
          head: ["ID", "Task", "Status"],
          style: { head: ["cyan"] },
        });

        tasks.forEach((task) => {
          table.push([
            task.id,
            task.title,
            task.completed
              ? chalk.green("Completed")
              : chalk.yellow("Pending"),
          ]);
        });

        console.log(table.toString());
        break;
      }

      case "complete": {
        if (!completeTask(args[0])) {
          throw new Error("Task ID not found.");
        }

        console.log(chalk.green("Task completed successfully."));
        break;
      }

      case "delete": {
        if (!deleteTask(args[0])) {
          throw new Error("Task ID not found.");
        }

        console.log(chalk.green("Task deleted successfully."));
        break;
      }

      case "quote": {
        const spinner = ora("Fetching a motivational quote...").start();

        try {
          const result = await getQuote();
          spinner.succeed("Quote retrieved successfully!");
          console.log(chalk.italic(`"${result.quote}"`));
          console.log(chalk.dim(`— ${result.author}`));
        } catch (error) {
          spinner.fail("Could not retrieve quote.");
          throw error;
        }

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