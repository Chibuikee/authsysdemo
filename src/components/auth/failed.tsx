import React from "react";

// Type definitions
type ErrorType = "validation" | "conflict" | "network" | "server" | "general";

type ColorVariant = "red" | "orange" | "amber" | "blue";

interface ErrorConfig {
  title: string;
  message: string;
  suggestion: string;
  color: ColorVariant;
}

interface ColorClasses {
  bg: string;
  icon: string;
  text: string;
  button: string;
  alert: string;
  rings: string;
}

interface ErrorComponentProps {
  errorType?: ErrorType;
  errorMessage?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorType = "general",
  errorMessage,
  onRetry,
  onGoBack,
}) => {
  const getErrorConfig = (type: ErrorType): ErrorConfig => {
    switch (type) {
      case "validation":
        return {
          title: "Invalid Information",
          message: "Please check your input and try again.",
          suggestion: "Make sure all required fields are filled correctly.",
          color: "orange",
        };
      case "conflict":
        return {
          title: "Account Already Exists",
          message: "An account with this email already exists.",
          suggestion:
            "Try signing in instead or use a different email address.",
          color: "amber",
        };
      case "network":
        return {
          title: "Connection Failed",
          message: errorMessage || "Unable to connect to our servers.",
          suggestion: "Please check your internet connection and try again.",
          color: "blue",
        };
      case "server":
        return {
          title: "Server Error",
          message: errorMessage || "Something went wrong on our end.",
          suggestion: "Please try again in a few minutes.",
          color: "red",
        };
      default:
        return {
          title: "Something Went Wrong",
          message: errorMessage || "An unexpected error occurred.",
          suggestion:
            "Please try again or contact support if the problem continues.",
          color: "red",
        };
    }
  };

  const config: ErrorConfig = getErrorConfig(errorType);

  const colorClasses: Record<ColorVariant, ColorClasses> = {
    red: {
      bg: "from-red-50 via-rose-50 to-pink-50",
      icon: "from-red-400 to-rose-500",
      text: "from-red-600 to-rose-600",
      button: "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
      alert: "bg-red-50 border-red-200 text-red-700",
      rings: "border-red-200",
    },
    orange: {
      bg: "from-orange-50 via-amber-50 to-yellow-50",
      icon: "from-orange-400 to-amber-500",
      text: "from-orange-600 to-amber-600",
      button:
        "from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700",
      alert: "bg-orange-50 border-orange-200 text-orange-700",
      rings: "border-orange-200",
    },
    amber: {
      bg: "from-amber-50 via-yellow-50 to-orange-50",
      icon: "from-amber-400 to-yellow-500",
      text: "from-amber-600 to-yellow-600",
      button:
        "from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700",
      alert: "bg-amber-50 border-amber-200 text-amber-700",
      rings: "border-amber-200",
    },
    blue: {
      bg: "from-blue-50 via-indigo-50 to-purple-50",
      icon: "from-blue-400 to-indigo-500",
      text: "from-blue-600 to-indigo-600",
      button:
        "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
      alert: "bg-blue-50 border-blue-200 text-blue-700",
      rings: "border-blue-200",
    },
  };

  const colors: ColorClasses = colorClasses[config.color];

  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleGoBack = (): void => {
    if (onGoBack) {
      onGoBack();
    }
  };

  const handleContactSupport = (): void => {
    // Placeholder for contact support functionality
    console.log("Contact support clicked");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-4`}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:scale-105">
        {/* Animated Error Icon */}
        <div className="relative mb-8">
          <div
            className={`w-24 h-24 mx-auto bg-gradient-to-r ${colors.icon} rounded-full flex items-center justify-center shadow-lg animate-pulse`}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Decorative rings */}
          <div
            className={`absolute inset-0 w-24 h-24 mx-auto border-4 ${colors.rings} rounded-full animate-ping opacity-20`}
          ></div>
          <div
            className={`absolute inset-0 w-32 h-32 mx-auto -m-4 border-2 ${colors.rings} rounded-full animate-ping opacity-10`}
          ></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-4`}
          >
            {config.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            {config.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleRetry}
            className={`w-full bg-gradient-to-r ${colors.button} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2`}
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Registration
          </button>
        </div>

        {/* Error Details */}
        <div className={`${colors.alert} border rounded-xl p-4 mb-4`}>
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold">What can you do?</h3>
          </div>
          <p className="text-sm">{config.suggestion}</p>
        </div>

        {/* Support Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Still having trouble?
            <button
              onClick={handleContactSupport}
              className={`ml-1 font-semibold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent hover:underline`}
              type="button"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
