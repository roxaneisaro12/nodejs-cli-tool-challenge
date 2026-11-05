import { randomUUID } from "node:crypto";
import { loadTasks, saveTasks } from "./storage.js";

export async function addTask(title) {
  if (!title || !title.trim()) {
    throw new Error("Task title cannot be empty.");
  }

  const tasks = await loadTasks();

  const task = {
    id: randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  await saveTasks(tasks);

  return task;
}

export async function getTasks() {
  return await loadTasks();
}

export async function completeTask(id) {
  const tasks = await loadTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    throw new Error("Task not found.");
  }

  task.completed = true;
  await saveTasks(tasks);

  return task;
}

export async function deleteTask(id) {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter((item) => item.id !== id);

  if (updatedTasks.length === tasks.length) {
    throw new Error("Task not found.");
  }

  await saveTasks(updatedTasks);

  return true;
}