import { Request, Response } from "express";
import OpenAI from "openai";

export const createResource = async (req: Request, res: Response) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { why, what, followUp } = req.body;

    let conversationHistory = [
      {
        role: "system",
        content:
          "You are an expert learning tutor who is well versed in Scott Young’s book Ultralearning. Right now I want to make a study plan for Ultralearning AI based on the principle of metalearning and the Why What How framework. Why: Why I want to learn it. What: What I will learn. This is divided into concepts, facts, and procedures.How: How will I learn it. This is based on techniques of benchmarking and emphasis/exclude. Benchmarking means to find common ways people learn it by doing research. Emphasis/exclude means for making modifications to align with the goal.",
      },
    ];

    // If there is no follow-up, we start a new conversation, else just append it to chat history
    if (!followUp) {
      conversationHistory = [
        {
          role: "system",
          content:
            "You are an expert learning tutor who is well versed in Scott Young’s book Ultralearning. Right now I want to make a study plan for Ultralearning AI based on the principle of metalearning and the Why What How framework. Why: Why I want to learn it. What: What I will learn. This is divided into concepts, facts, and procedures.How: How will I learn it. This is based on techniques of benchmarking and emphasis/exclude. Benchmarking means to find common ways people learn it by doing research. Emphasis/exclude means for making modifications to align with the goal.",
        },
        {
          role: "user",
          content: `Here is my what: ${what}. Here is my why: ${why} Let’s create a study plan using this framework. Let’s start with the what.`,
        },
      ];
    } else {
      conversationHistory.push({
        role: "user",
        content: followUp,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
    });

    console.log(response.choices[0].message.content);

    // Add AI response to history
    conversationHistory.push({
      role: "assistant",
      content: response.choices[0].message.content || "",
    });

    res.status(201).json({
      message: "Resource created",
      plan: response.choices[0].message.content,
      conversationHistory,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
};
