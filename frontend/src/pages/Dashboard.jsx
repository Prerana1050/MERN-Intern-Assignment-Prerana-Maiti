import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await API.get("/dashboard");
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Unable to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return <div className="text-center mt-5">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    const stats = [
        { title: "Total Projects", value: data.totalProjects, color: "primary" },
        { title: "Total Tasks", value: data.totalTasks, color: "info" },
        { title: "Completed Tasks", value: data.completedTasks, color: "success" },
        { title: "Pending Tasks", value: data.pendingTasks, color: "warning" },
        { title: "Overdue Tasks", value: data.overdueCount, color: "danger" }
    ];

    return (
        <div className="bg-light min-vh-100">

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
                <Link className="navbar-brand fw-bold" to="/dashboard">
                    TaskFlow
                </Link>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <span className="text-white">
                        Welcome, {user.name}
                    </span>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container py-4">

                <h2 className="fw-bold mb-1">Dashboard</h2>
                <p className="text-muted">Here's an overview of your workspace.</p>

                {/* Statistics */}
                <div className="row g-4 mt-2">
                    {stats.map((item) => (
                        <div className="col-md-4 col-lg-3" key={item.title}>
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h6 className="text-muted">{item.title}</h6>

                                    <h2 className={`text-${item.color} fw-bold`}>
                                        {item.value}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <h5 className="fw-bold">Quick Actions</h5>

                        <div className="d-flex flex-wrap gap-2 mt-3">
                            <Link to="/projects" className="btn btn-primary">
                                View Projects
                            </Link>

                            {user.role === "admin" && (
                                <Link to="/admin" className="btn btn-dark">
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Overdue Tasks */}
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body">
                        <h5 className="fw-bold text-danger">Overdue Tasks</h5>

                        {data.overdueTasks.length === 0 ? (
                            <p className="text-muted mt-3 mb-0">
                                No overdue tasks. Great work!
                            </p>
                        ) : (
                            <div className="table-responsive mt-3">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Priority</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.overdueTasks.map((task) => (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.priority}</td>
                                                <td>
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <span className="badge bg-danger">
                                                        {task.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;