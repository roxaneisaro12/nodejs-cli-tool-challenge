import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DATA_FILE = new URL("../data/tasks.json", import.meta.url);

export async function loadTasks() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.tasks || [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function saveTasks(tasks) {
  const folder = dirname(fileURLToPath(DATA_FILE));

  await mkdir(folder, { recursive: true });

  await writeFile(
    DATA_FILE,
    JSON.stringify({ tasks }, null, 2),
    "utf-8"
  );
}