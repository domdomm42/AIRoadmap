"use client";

import { useState } from "react";

interface FollowUpInputProps {
  onSubmit: (followUp: string) => Promise<void>;
  loading?: boolean;
}

export default function FollowUpInput({
  onSubmit,
  loading,
}: FollowUpInputProps) {
  const [followUp, setFollowUp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp.trim()) return;
    await onSubmit(followUp);
    setFollowUp("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Ask a Follow-up Question
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Ask for more details or clarification..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 px-4 py-2.5 
                     text-gray-700 dark:text-gray-200
                     focus:border-blue-500 dark:focus:border-blue-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !followUp.trim()}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
