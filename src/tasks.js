import { randomUUID } from "node:crypto";
import { readTasks, saveTasks } from "./storage.js";

export function addTask(title) {
  if (!title || !title.trim()) {
    throw new Error("Task title cannot be empty.");
  }

  const tasks = readTasks();
  const task = {
    id: randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveTasks(tasks);
  return task;
}

export function getTasks() {
  return readTasks();
}

export function completeTask(id) {
  const tasks = readTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) return false;

  task.completed = true;
  saveTasks(tasks);
  return true;
}

export function deleteTask(id) {
  const tasks = readTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);

  if (updatedTasks.length === tasks.length) return false;

  saveTasks(updatedTasks);
  return true;
}
