const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("TaskFlow API is running");
});

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/projects", require("./routes/projectroutes"));
app.use("/api/tasks", require("./routes/taskroutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/admin", require("./routes/adminroutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});