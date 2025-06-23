"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950 dark:to-indigo-950 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100">
            Coming Soon
          </h1>
          <p className="text-lg text-purple-700 dark:text-purple-300">
            Something amazing is on the way. Be the first to know when we launch!
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-purple-900 text-purple-900 dark:text-purple-100 placeholder-purple-500 dark:placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Join the Waitlist
            </button>
          </form>
        ) : (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Thanks for joining!
            </h2>
            <p className="text-green-700 dark:text-green-300">
              We&apos;ll notify you as soon as we&apos;re ready to launch.
            </p>
          </div>
        )}

        <p className="text-sm text-purple-600 dark:text-purple-400">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
