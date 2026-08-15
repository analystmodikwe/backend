const express = require("express");
const router = express.Router();

const { 
    getTasks , 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask,
} = require("../controllers/taskControler");

router.get("/tasks", getTasks );
router.get("/tasks", getTaskById);
router.post("/tasks", createTask );
router.put("/tasks", updateTask);
router.delete("/tasks", deleteTask);


module.exports = router;