const { nanoid } = require("nanoid");
const tasks = require("../models/tasks");

// read all tasks(GET)
const getTasks = (req, res) =>{
    res.json(tasks);
};

//  reading tasks by its id(GET/ID)
const getTasksById = (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: "TASK IS NOT FOUND"});
    res.status(200).json(task)  
};

// creating task (POST)
const createTask = (req, res) => {
    // request body expects a title of a task when creating a new task
    // if the title is not provided then 404 status wil show up
    const { title } = req.body;  
    if (!title) return res.status(400).json({ message: "TITLE IS REQUIRED"});
};

