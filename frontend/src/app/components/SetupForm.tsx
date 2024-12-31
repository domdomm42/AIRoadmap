"use client";

import { useState } from "react";

interface SetupFormProps {
  onSubmit: (topic: string, why: string) => Promise<void>;
  loading: boolean;
}

export default function SetupForm({ onSubmit, loading }: SetupFormProps) {
  const [topic, setTopic] = useState("");
  const [why, setWhy] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(topic, why);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
    >
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          What do you want to learn?
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          placeholder="e.g., Machine Learning, Web Development"
          required
        />
      </div>

      <div>
        <label
          htmlFor="why"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          What are the outcomes you want to achieve?
        </label>
        <textarea
          id="why"
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          placeholder="Your motivation and goals..."
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg text-white font-medium 
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
      } transition-all duration-200 transform hover:scale-[1.02]`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Generating...
          </div>
        ) : (
          "Generate Roadmap"
        )}
      </button>
    </form>
  );
}
