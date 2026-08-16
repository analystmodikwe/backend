const { nanoid } = require("nanoid");
const { readTasks, writeTasks } = require("../models/tasks");
const verifyTask = require("../utils/verifyTask")

// read all tasks(GET)
const getTasks = (req, res, next) =>{
    try{
        const tasks = await readTasks();
    
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};


//  reading tasks by its id(GET/ID)
const getTasksById = async (req, res, next) => {

    try{

        // tasks will read readTasks
        const tasks = await readTasks();

        const task = tasks.find((t) => t.id === req.params.id);

        if (!task) return res.status(404).json({ message: "TASK IS NOT FOUND"});
        res.status(200).json(task);

    } catch (err) {
        next(err);
    }   
};


// creating task (POST)
const createTask = async (req, res, next) => {

    try{

        // request body expects a title of a task when creating a new task
        // if the title is not provided then 404 status wil show up
        const { title } = req.body;  
        if (!title) return res.status(400).json({ message: "TITLE IS REQUIRED"});

        const tasks = await readTasks();

        // what each object should have
        const newTask = {
            id: nanoid(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        // this is what the tasks array will expect on request
        tasks.push(newTask);
        // persis to disk before responding
        await writeTasks(tasks);

        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};


// updating task(PUT)
const updateTask = async (req, res, next) =>{
    try{

        const tasks = await readTasks();
        const task = tasks.find((t) => t.id === req.params.id);
        if (!task) return res.status(404).json({ message: "TASK IS NOT FOUND"});
        
        // object destructuring to only extract tite and completed from the object
        const { title, completed } = req.body;
        
        // if title and completed values were not provided leave everything as it is but if provided update only those values, so it will update the feild ony if the client actualy sent it
        if (title !== undefined) task.title = title;
        if (completed !== undefined) task.completed = completed;

        await writeTasks(tasks);
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
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

//  function that will verify the task by its ID, and i used aync because await
// is needed to verifyTask() inside it
const verifyTaskById = async (req, res, next) => {
    const task = tasks.find((t) => t.id === req.params.id);

    // if the task doesnt exist issue out the error message(404)
    if (!task) {
        return res.status(404).json({ message: "TASK NOT FOUND" });
    }

    try{
        // await will pause the function here without blocking the rest of the server until verifyTask delay finishes
        const result = await verifyTask(task);

        if (!result.valid) {

            // 422 = found but fails validation
            return res.status(422).json({ message:result.reason });
        }

        return res.status(200).json({ message:" TASK VERIFIED SUCCESSFULY", task });

    } catch (err) {
        // if verifyTask throws unexpectedly, there will stil be a response instead of letting the server hang or crash
        next(err);
    }
};

module.exports = { 
    getTasks, 
    getTasksById, 
    createTask, 
    updateTask, 
    deleteTask,
    verifyTaskById
};

