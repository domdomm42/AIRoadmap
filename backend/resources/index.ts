import express, { Request, Response } from "express";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/resources", resourceRoutes);
// Basic health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
