const express = require("express");
const router = express.Router();

const { 
    getTasks , 
    getTasksById, 
    createTask, 
    updateTask, 
    deleteTask,
} = require("../controllers/taskControler");

router.get("/tasks", getTasks );
router.get("/tasks", getTasksById);
router.post("/tasks", createTask );
router.put("/tasks", updateTask);
router.delete("/tasks", deleteTask);


module.exports = router;