import { Request, Response } from "express";
import OpenAI from "openai";
import {
  setupUltralearningPlan,
  createHowUltralearningPlan,
  createStudyPlan,
  addFollowup,
} from "../services/aiService";

const conversationHistory: { role: string; content: string }[] = [];

// export const createResource = async (req: Request, res: Response) => {
//   try {
//     const openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const { why, what, followUp } = req.body;

//     // Setup Ultralearning Plan
//     await setupUltralearningPlan(what, why, conversationHistory);

//     // if followup is true, add followup to conversation history
//     if (followUp) {
//       addFollowup(conversationHistory, followUp);
//     }

//     // Create How Ultralearning Plan
//     await createHowUltralearningPlan(conversationHistory);

//     // Create Study Plan
//     await createStudyPlan(conversationHistory);

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
//     });

//     console.log(response.choices[0].message.content);

//     // Add AI response to history
//     conversationHistory.push({
//       role: "assistant",
//       content: response.choices[0].message.content || "",
//     });

//     res.status(201).json({
//       message: "Resource created",
//       plan: response.choices[0].message.content,
//       conversationHistory,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to create resource" });
//   }
// };

// Initial setup/goal route
export const handleSetupGoal = async (req: Request, res: Response) => {
  try {
    const { what, why } = req.body;
    const result = await setupUltralearningPlan(what, why, conversationHistory);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create initial plan" });
  }
};

// Follow-up questions route
export const handleFollowUp = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    const result = await addFollowup(conversationHistory, question);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to process follow-up" });
  }
};

export const handleCreateHowUltralearningPlan = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createHowUltralearningPlan(conversationHistory);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create how plan" });
  }
};

export const handleCreateStudyPlan = async (req: Request, res: Response) => {
  try {
    const result = await createStudyPlan(conversationHistory);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create study plan" });
  }
};
