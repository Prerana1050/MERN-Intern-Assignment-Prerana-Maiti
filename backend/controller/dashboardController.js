
const Project = require("../models/project");
const Task = require("../models/task");

const getDashboard = async (req, res) => {
    try {
        // Find projects where logged-in user is a member
        const projects = await Project.find({
            members: req.user.id
        });

        const projectIds = projects.map(project => project._id);

        // Find tasks belonging to these projects
        const tasks = await Task.find({
            project: { $in: projectIds }
        });

        const totalProjects = projects.length;
        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            task => task.status === "Done"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "To Do"
        ).length;

        const overdueTasks = tasks.filter(
            task =>
                task.status !== "Done" &&
                new Date(task.dueDate) < new Date()
        );

        res.status(200).json({
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueCount: overdueTasks.length,
            overdueTasks
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getDashboard };
