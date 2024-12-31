"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResponseField({ response }: { response: string }) {
  return (
    <div className="mt-6 w-full max-w-4xl mx-auto prose">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Your Personalized Learning Roadmap
        </h2>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
