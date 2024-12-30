"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [why, setWhy] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          what: topic,
          why: why,
        }),
      });
      const data = await res.json();
      setResponse(data.plan);
      setShowFollowUp(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followUp,
        }),
      });
      const data = await res.json();
      setResponse(data.plan);
      setFollowUp("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Learning Roadmap Generator
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Create your personalized learning journey with AI guidance
            </p>
          </div>

          {/* Initial Form */}
          {!response && (
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
                  Why do you want to learn this?
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
          )}

          {/* Response and Follow-up Section */}
          {response && (
            <div className="space-y-6">
              {/* Roadmap Display */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Your Learning Roadmap
                </h2>
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {response}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Follow-up Section */}
              {showFollowUp && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Would you like to modify anything?
                  </h3>
                  <form onSubmit={handleFollowUp} className="space-y-4">
                    <textarea
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                      placeholder="Ask for modifications or clarifications..."
                      rows={3}
                      required
                    />
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 py-3 px-6 rounded-lg text-white font-medium 
                          ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          } transition-all duration-200`}
                      >
                        {loading ? "Updating..." : "Update Roadmap"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowFollowUp(false)}
                        className="flex-1 py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
