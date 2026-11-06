
const Project = require("../models/project");
const Task = require("../models/task");

// Create a project
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const project = await Project.create({
            name,
            description,
            owner: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get projects of logged-in user
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            members: req.user.id
        }).populate("owner", "name email");

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        project.name = name.trim();
        project.description = description || "";

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete project and its tasks
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await Task.deleteMany({
            project: project._id
        });

        res.status(200).json({
            message: "Project and its tasks deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProject, getMyProjects, updateProject, deleteProject };
