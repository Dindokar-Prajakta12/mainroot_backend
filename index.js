import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend server running on http://localhost:${PORT}`);
});
