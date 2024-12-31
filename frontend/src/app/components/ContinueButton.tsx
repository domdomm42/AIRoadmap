"use client";

import React from "react";

interface ContinueButtonProps {
  onClick: () => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ContinueButton({
  onClick,
  loading = false,
  disabled = false,
  className = "",
}: ContinueButtonProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!loading && !disabled) {
      await onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className={`
        relative px-6 py-3 text-white bg-indigo-600 rounded-lg
        transition-all duration-200 ease-in-out
        hover:bg-indigo-700 focus:outline-none focus:ring-2 
        focus:ring-indigo-500 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center min-w-[120px]
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="opacity-0">Continue</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      ) : (
        "Continue"
      )}
    </button>
  );
}
