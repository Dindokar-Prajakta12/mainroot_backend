import { loadData } from "../models/DataModel.js";

export const getHealth = (req, res) => {
    res.json({ status: "ok" });
};

export const getAdminUsers = (req, res) => {
    const data = loadData();
    const users = data.users.map((user) => ({ name: user.name, email: user.email, role: user.role }));
    res.json({ users });
};

export const getDashboardSummary = (req, res) => {
    const data = loadData();
    const role = req.user.role;

    if (role === "admin") return res.json({ summary: data.adminStats });
    if (role === "manager") return res.json({ summary: { teamSize: data.managerTeam.length, pendingApprovals: 7, projects: 4 } });
    if (role === "user") return res.json({ summary: { tasks: data.userTasks.length, completed: data.userTasks.filter((task) => task.completed).length } });

    return res.status(403).json({ message: "Unauthorized role." });
};

export const getManagerTeam = (req, res) => {
    const data = loadData();
    res.json({ team: data.managerTeam });
};

export const getUserTasks = (req, res) => {
    const data = loadData();
    res.json({ tasks: data.userTasks });
};
