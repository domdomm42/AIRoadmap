import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Route to handle roadmap generation requests
app.post("/api/roadmap", async (req: Request, res: Response) => {
  try {
    const { topic, level } = req.body;
    // TODO: Implement roadmap service communication
    res.json({ message: "Roadmap generation endpoint" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
