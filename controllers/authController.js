import { loadData, saveData } from "../models/DataModel.js";
import { createAuthToken } from "../utils/tokenUtils.js";

export const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const data = loadData();
    const user = data.users.find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createAuthToken(user);
    return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
};

export const register = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const data = loadData();
    const existingUser = data.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({ message: "This email is already registered." });
    }

    const newUser = { name, email, password, role: "user" };
    data.users.push(newUser);
    saveData(data);

    return res.status(201).json({ message: "Registration successful." });
};

export const getMe = (req, res) => {
    res.json({ user: req.user });
};
