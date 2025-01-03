import { Request, Response } from "express";
import {
  setupUltralearningPlan,
  createHowUltralearningPlan,
  createStudyPlan,
  addFollowup,
} from "../services/aiService";

// Initial setup/goal route
export const handleSetupGoal = async (req: Request, res: Response) => {
  try {
    const { what, why, conversationHistory } = req.body;
    const result = await setupUltralearningPlan(what, why, conversationHistory);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create initial plan" });
  }
};

// Follow-up questions route
export const handleFollowUp = async (req: Request, res: Response) => {
  try {
    const { question, conversationHistory } = req.body;
    const result = await addFollowup(conversationHistory, question);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to process follow-up" });
  }
};

export const handleCreateHowUltralearningPlan = async (
  req: Request,
  res: Response
) => {
  try {
    const { conversationHistory } = req.body;
    const result = await createHowUltralearningPlan(conversationHistory);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create how plan" });
  }
};

export const handleCreateStudyPlan = async (req: Request, res: Response) => {
  try {
    const { timeslot, conversationHistory } = req.body;
    const result = await createStudyPlan(conversationHistory, timeslot);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create study plan" });
  }
};
