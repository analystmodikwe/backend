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

