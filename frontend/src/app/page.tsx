"use client";

import { useState } from "react";
import ResponseField from "./components/ResponseField";
import SetupForm from "./components/SetupForm";
import FollowUpInput from "./components/FollowUpInput";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [whatResponse, setWhatResponse] = useState<string | null>(null);

  const handleWhatFormSubmit = async (topic: string, why: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources/setupGoal", {
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
      setWhatResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setWhatResponse("An error occurred while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (followUp: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources/followup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: followUp }),
      });
      const data = await res.json();
      setWhatResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setWhatResponse("An error occurred while generating the roadmap.");
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
          {whatResponse ? (
            <div>
              <ResponseField response={whatResponse} />
              <FollowUpInput onSubmit={handleFollowUp} loading={loading} />
              <button>continue</button>
            </div>
          ) : (
            <SetupForm onSubmit={handleWhatFormSubmit} loading={loading} />
          )}
          {/* {howResponse && <ResponseField response={howResponse} />} */}
        </div>
      </div>
    </div>
  );
}
