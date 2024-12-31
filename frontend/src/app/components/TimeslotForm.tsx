"use client";

import { useState } from "react";
import ContinueButton from "./ContinueButton";

interface TimeslotFormProps {
  onSubmit: (timeslot: string) => Promise<void>;
  loading: boolean;
}

export default function TimeslotForm({ onSubmit, loading }: TimeslotFormProps) {
  const [timeslot, setTimeslot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(timeslot);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
    >
      <div>
        <label
          htmlFor="timeslot"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          What is your availability? (The more specific, the better)
        </label>
        <input
          id="timeslot"
          type="text"
          value={timeslot}
          onChange={(e) => setTimeslot(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          placeholder="e.g., 4 weeks, 3 hours every Monday and Friday"
          required
        />
        <ContinueButton onClick={() => onSubmit(timeslot)} disabled={loading} />
      </div>
    </form>
  );
}
