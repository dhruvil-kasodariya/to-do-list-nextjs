"use client"; // Ensure this is a Client Component

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">
        Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={reset}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Try Again
      </button>
    </div>
  );
}
