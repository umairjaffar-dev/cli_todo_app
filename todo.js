import inquirer from "inquirer";
import fs from "fs";

const TASKS_FILE = "tasks.json";

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const data = fs.readFileSync(TASKS_FILE, "utf-8");

  return JSON.parse(data);
}

function saveTask(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

const mainMenu = async () => {
  const tasks = loadTasks();

};

mainMenu();
