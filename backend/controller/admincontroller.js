
const User = require("../models/user");
const Project = require("../models/project");

const getAdminOverview = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        const projects = await Project.find()
            .populate("owner", "name email");

        res.status(200).json({
            totalUsers: users.length,
            totalProjects: projects.length,
            users,
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getAdminOverview };
