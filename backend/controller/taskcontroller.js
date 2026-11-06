
const Task = require("../models/task");
const Project = require("../models/project");

// Create a task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, assignedTo } = req.body;
        const { projectId } = req.params;

        if (!title || !dueDate) {
            return res.status(400).json({
                message: "Title and due date are required"
            });
        }

        // Check whether the user belongs to this project
        const project = await Project.findOne({
            _id: projectId,
            members: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or access denied"
            });
        }

        // If a task is assigned, check that the user is a project member
        if (assignedTo && !project.members.some(
            member => member.toString() === assignedTo
        )) {
            return res.status(400).json({
                message: "Assignee must be a project member"
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            project: projectId,
            createdBy: req.user.id,
            assignedTo: assignedTo || null
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks of a project
const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            members: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or access denied"
            });
        }

        const tasks = await Task.find({
            project: projectId
        })
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["To Do","In Progress","Done"].includes(status)) {
            return res.status(400).json({
                message: "Status must be To Do, In Progress, or Done"
            });
        }

        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const project = await Project.findOne({
            _id: task.project,
            members: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "You cannot update this task"
            });
        }

        task.status = status;
        await task.save();

        res.status(200).json({
            message: "Task status updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check project ownership/membership
        const project = await Project.findOne({
            _id: task.project,
            members: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "You are not allowed to edit this task"
            });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "Task title is required"
                });
            }
            task.title = title.trim();
        }

        if (description !== undefined) {
            task.description = description;
        }

        if (priority !== undefined) {
            if (!["Low", "Medium", "High"].includes(priority)) {
                return res.status(400).json({
                    message: "Invalid priority"
                });
            }
            task.priority = priority;
        }

        if (status !== undefined) {
            if (!["To Do", "In Progress", "Done"].includes(status)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }
            task.status = status;
        }

        if (dueDate !== undefined) {
            if (isNaN(Date.parse(dueDate))) {
                return res.status(400).json({
                    message: "Invalid due date"
                });
            }
            task.dueDate = dueDate;
        }

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const project = await Project.findOne({
            _id: task.project,
            members: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "You are not allowed to delete this task"
            });
        }

        await Task.findByIdAndDelete(req.params.taskId);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getProjectTasks,
    updateTaskStatus,
    updateTask,
    deleteTask
};
