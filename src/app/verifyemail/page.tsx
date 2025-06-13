"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    // Extract token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      verifyEmailToken(token);
    } else {
      setIsLoading(false);
      setError("No verification token found in the URL");
    }
  }, []);

  const verifyEmailToken = async (token: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Make API call to verify the email token
      const res = await axios.post(
        `http://13.53.36.102/api/v1/auth/confirm-account`,
        // `https://authsysbackend-cfqp.onrender.com/api/v1/auth/confirm-account`,
        // `http://127.0.0.1:8000/api/v1/auth/confirm-account`,
        { token: token }
      );
      console.log(res);
      // Check if verification was successful
      if ( res?.data) {
        setIsVerified(true);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.errors);
      // Handle different types of errors

      console.log("Registration error:", error);
      if (
        error?.response?.data?.errors &&
        typeof error?.response?.data?.errors == "string"
      ) {
        setIsExpired(true);
        setError(error?.response?.data?.errors);
      }
      if (
        error?.response?.data?.errors &&
        typeof error?.response?.data?.errors !== "string"
      ) {
        setIsExpired(true);
        setError(error?.response?.data?.errors[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while verifying
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Verifying Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your email address...
            </p>

            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Great! Your email address has been verified. You now have full
              access to your account.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Go to Home
              </button>

              <button
                onClick={() => (window.location.href = "/signin")}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Sign In to Your Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {isExpired ? (
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {isExpired ? "Verification Link Expired" : "Verification Failed"}
          </h2>

          <p className="text-gray-600 mb-6">{error}</p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01"
                ></path>
              </svg>
              <div className="text-left">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  What to do next:
                </h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>
                    • Check if you clicked the correct link from your email
                  </li>
                  <li>• Make sure the link hasn&apos;t been used before</li>
                  <li>
                    • Request a new verification email if this one expired
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() =>
                (window.location.href = "/")
              }
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Home page
            </button>

            <button
              onClick={() => (window.location.href = "/signin")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Still having trouble?
            <a
              href="/contact"
              className="text-indigo-600 hover:text-indigo-700 ml-1"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
