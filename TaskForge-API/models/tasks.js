const fs = require("fs/promises");
const path = require("path");

// Path to our "database" file {tasks.json} — path.join keeps this working __dirname is a Node.js variable that represents the directory where the current JavaScript file is located.
const dataPath = path.join(__dirname, "../data/tasks.json");

// reading the current task
const readTasks = async () => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

// Writes the full array back to disk. We always write the WHOLE array,
// not append — simplest way to keep tasks.json valid JSON.
const writeTasks = async (tasks) => {
    await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
};

module.exports = { readTasks, writeTasks };
