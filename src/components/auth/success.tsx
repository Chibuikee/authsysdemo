"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessComponent = () => {
  const route = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:scale-105">
        {/* Animated Success Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <svg
              className="w-12 h-12 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Decorative rings */}
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-32 h-32 mx-auto -m-4 border-2 border-green-100 rounded-full animate-ping opacity-10 animation-delay-200"></div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Account Created!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome aboard! Your account has been successfully created and
            you&apos;re ready to get started.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => route.push("/dashboard")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Continue to Dashboard
          </button>

          <button
            onClick={() => route.refresh()}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            Back to Registration
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-green-800">Next Steps</h3>
          </div>
          <p className="text-sm text-green-700">
            Check your email for a verification link to activate all account
            features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessComponent;
