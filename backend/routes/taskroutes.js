
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authmiddleware");

const {
    createTask,
    getProjectTasks,
    updateTaskStatus,
    updateTask,
    deleteTask
} = require("../controller/taskcontroller");

router.post("/:projectId", protect, createTask);
router.get("/:projectId", protect, getProjectTasks);
router.patch("/:taskId/status", protect, updateTaskStatus);
router.put("/:taskId", protect, updateTask);
router.delete("/:taskId", protect, deleteTask);

module.exports = router;
