"use client";

import { useState } from "react";
import ResponseField from "./components/ResponseField";
import SetupForm from "./components/SetupForm";
import TimeslotForm from "./components/TimeslotForm";
import ContinueButton from "./components/ContinueButton";

enum Stage {
  SETUP = "SETUP",
  WHAT = "WHAT",
  HOW = "HOW",
  SCHEDULE = "SCHEDULE",
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.SETUP);
  const [whatResponse, setWhatResponse] = useState<string | null>(null);
  const [howResponse, setHowResponse] = useState<string | null>(null);
  const [scheduleResponse, setScheduleResponse] = useState<string | null>(null);

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
      setCurrentStage(Stage.WHAT);
    } catch (error) {
      console.error("Error:", error);
      setWhatResponse("An error occurred while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const getHowData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources/howPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setHowResponse(data);
      setCurrentStage(Stage.HOW);
    } catch (error) {
      console.error("Error:", error);
      setHowResponse("An error occurred while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const getSchedule = async (timeslot: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources/studyPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeslot: timeslot,
        }),
      });
      const data = await res.json();
      setScheduleResponse(data);
      setCurrentStage(Stage.SCHEDULE);
    } catch (error) {
      console.error("Error:", error);
      setScheduleResponse("An error occurred while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case Stage.SETUP:
        return <SetupForm onSubmit={handleWhatFormSubmit} loading={loading} />;

      case Stage.WHAT:
        return (
          <div>
            <ResponseField response={whatResponse!} />
            <div className="mt-6">
              <ContinueButton onClick={getHowData} loading={loading} />
            </div>
          </div>
        );

      case Stage.HOW:
        return (
          <div>
            <ResponseField response={howResponse!} />
            <TimeslotForm onSubmit={getSchedule} loading={loading} />
          </div>
        );

      case Stage.SCHEDULE:
        return (
          <div>
            <ResponseField response={scheduleResponse!} />
          </div>
        );

      default:
        return null;
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

          {/* Stage Progress Indicator */}
          <div className="flex justify-center mb-8">
            {Object.values(Stage).map((stage) => (
              <div
                key={stage}
                className={`flex items-center ${
                  stage !== Stage.SCHEDULE ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStage === stage
                      ? "bg-indigo-600 text-white"
                      : Object.values(Stage).indexOf(stage) <
                        Object.values(Stage).indexOf(currentStage)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {Object.values(Stage).indexOf(stage) + 1}
                </div>
                {stage !== Stage.SCHEDULE && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      Object.values(Stage).indexOf(stage) <
                      Object.values(Stage).indexOf(currentStage)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Stage Content */}
          {renderStageContent()}
        </div>
      </div>
    </div>
  );
}
