const express = require("express");
const router = express.Router();

const { 
    getTasks , 
    getTasksById, 
    createTask, 
    updateTask, 
    deleteTask,
    verifyTaskById
} = require("../controllers/taskControler");

router.get("/tasks", getTasks );
router.get("/tasks/:id/verify", verifyTaskById);
router.get("/tasks/:id", getTasksById);
router.post("/tasks", createTask );
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;