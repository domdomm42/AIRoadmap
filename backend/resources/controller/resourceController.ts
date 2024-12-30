import { Request, Response } from "express";
import OpenAI from "openai";

export const createResource = async (req: Request, res: Response) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { why, what, followUp, stage, timeline } = req.body;

    const systemPrompt = `You are an expert learning tutor who is well versed in Scott Young’s book Ultralearning. Right now I want to make a study plan for Ultralearning AI based on the principle of metalearning and the Why What How framework. 

Why: Why I want to learn it. 
What: What I will learn. This is divided into concepts, facts, and procedures.
How: How will I learn it. This is based on techniques of benchmarking and emphasis/exclude. Benchmarking means to find common ways people learn it by doing research. Emphasis/exclude means for making modifications to align with the goal. 
`;

    const stagePrompts = {
      1: `
Here is my what: ${what}
Here is my why: ${why}
Heres my timeline: ${timeline} weeks
        
Please create a structured learning roadmap using this format:

# 🎯 Learning Goal
${what}

## 📝 Learning Motivation
${why}

## 🗺️ Core Concepts to Master
[List key concepts]

## 📚 Knowledge Framework
- **Key Concepts:**
- **Important Facts:**
- **Core Procedures:**

Please format the response in markdown with emojis and clear section headers.
`,
      2: `Now let's brainstorm the How. Please structure the response as:

# 🛠️ Learning Approach

## 📖 Recommended Resources
[List of resources with brief descriptions]

## 📈 Progress Tracking
[Specific metrics and milestones]

Please include emojis and clear formatting.`,
      3: `Now let's create a detailed week-by-week study plan. Format as:

# 📅 Weekly Study Plan

## Week 1: [Topic] 🎯
### Learning Goals
### Resources
### Assignments
### Grading Rubric
- Criteria 1 (XX%):
- Criteria 2 (XX%):

[Repeat for subsequent weeks]
`,
    };

    let conversationHistory = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];

    if (!followUp) {
      conversationHistory.push({
        role: "user",
        content:
          stagePrompts[stage as keyof typeof stagePrompts] || stagePrompts[1],
      });
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
