import inquirer from "inquirer";
import fs from "fs";

const TASKS_FILE = "tasks.json";

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const data = fs.readFileSync(TASKS_FILE, "utf-8");

  if (!data.trim()) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing tasks file:", error.message);
    return [];
  }
}

function saveTask(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

const mainMenu = async () => {
  const tasks = loadTasks();

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "waht would you like to do?",
      choices: [
        "Add Task",
        "List tasks",
        "Mark Task as Complete",
        "Delete Task",
        "Exit",
      ],
    },
  ]);

  if (action === "Add Task") {
    console.log("Add task Here!");
    const { description } = await inquirer.prompt([
      {
        type: "input",
        name: "description",
        message: "Enter Task Description:",
      },
    ]);

    tasks.push({ description, completed: false });
    saveTask(tasks);
    console.log("Task Added!");
  } else if (action === "List tasks") {
    console.log({ tasks });
    tasks.forEach((task, indx) => {
      const status = task.completed ? ["✔️"] : [" "];
      console.log(`${indx + 1}: ${status} ${task.description}`);
    });
  } else if (action === "Mark Task as Complete") {
    const { index } = await inquirer.prompt([
      {
        type: "list",
        name: "index",
        message: "Select a task to mark as complete:",
        choices: tasks.map((task, i) => ({ name: task.description, value: i })),
      },
    ]);

    tasks[index].completed = true;
    saveTask(tasks);
  } else if (action === "Delete Task") {
    const { index } = await inquirer.prompt([
      {
        type: "list",
        name: "index",
        message: "Select a task to delete:",
        choices: tasks.map((task, i) => ({ name: task.description, value: i })),
      },
    ]);

    tasks.splice(index, 1);
    saveTask(tasks);
    console.log("Task Deleted!");
  } else {
    console.log("Goodbye!");
    return;
  }
};

mainMenu();
