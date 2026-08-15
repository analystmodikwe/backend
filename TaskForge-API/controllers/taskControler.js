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

    // what each object should have
    const newTask = {
        id: nanoid(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    // this is what the tasks array will expect on request
    tasks.push(newTask);
    res.status(201).ison(newTask);
};

// updating task(PUT)
const updateTask = (req, res) =>{
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: "TASK IS NOT FOUND"});
    res.status(200).json(task)  

    // object destructuring to only extract tite and completed from the object
    const { title, completed } = req.body;
    
    // if title and completed values were not provided leave everything as it is but if provided update only those values, so it will update the feild ony if the client actualy sent it
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json(task);
};

// deleteTask (DELETE)
const deleteTask = (req, res) => {
    // find the task by id and if the id does not exist send a 404 status
    const index = tasks.findIndex(t => t.id ===req.params.id);
    if (index === -1) return res.status(404).json({ message: "TASK NOT FOUND" });

    // it will remove one task from an array
    tasks.splice(index, 1);
    res.status(204).send();
};

module.exports = { 
    getAllTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask
};

