import { decodeAuthToken } from "../utils/tokenUtils.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    const decoded = decodeAuthToken(token);

    if (!decoded || decoded.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = decoded;
    next();
};

export const authorize = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
