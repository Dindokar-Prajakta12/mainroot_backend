import express from "express";
import { getHealth, getAdminUsers, getDashboardSummary, getManagerTeam, getUserTasks } from "../controllers/apiController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/health", getHealth);
router.get("/admin/users", authenticate, authorize("admin"), getAdminUsers);
router.get("/dashboard/summary", authenticate, getDashboardSummary);
router.get("/manager/team", authenticate, authorize("manager"), getManagerTeam);
router.get("/user/tasks", authenticate, authorize("user"), getUserTasks);

export default router;
