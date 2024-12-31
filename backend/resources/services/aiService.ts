import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const setupUltralearningPlan = async (
  what: string,
  why: string,
  conversationHistory: { role: string; content: string }[]
) => {
  const systemPrompt = `You are an expert learning tutor for ${what} who is well versed in Scott Young’s book Ultralearning. Right now I want to make a study plan for Ultralearning ${what} based on the principle of metalearning and the Why What How framework. Why: Why I want to learn it. What: What I will learn. This is divided into concepts, facts, and procedures. How: How will I learn it. This is based on techniques of benchmarking and emphasis/exclude. Benchmarking means to find common ways people lear...
  
  My why for learning ${what} is ${why}
  Let’s create a study plan using this framework. Let’s now just start with the what.
  Structure the response with emojis and clear section headers.
  `;

  conversationHistory = [
    {
      role: "system",
      content: systemPrompt,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
  });

  return response.choices[0].message.content;
};

export const addFollowup = async (
  conversationHistory: { role: string; content: string }[],
  followup: string
) => {
  conversationHistory.push({
    role: "user",
    content: followup,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
  });
  return response.choices[0].message.content;
};

export const createHowUltralearningPlan = async (
  conversationHistory: { role: string; content: string }[]
) => {
  conversationHistory.push({
    role: "user",
    content:
      "Now let’s brainstorm the How. Please format the response in markdown with emojis and clear section headers.",
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
  });
  return response.choices[0].message.content;
};

export const createStudyPlan = async (
  conversationHistory: { role: string; content: string }[]
) => {
  conversationHistory.push({
    role: "user",
    content:
      "Now let’s create a study plan. Please format the response in markdown with emojis and clear section headers.",
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: conversationHistory as OpenAI.Chat.ChatCompletionMessageParam[],
  });
  return response.choices[0].message.content;
};
