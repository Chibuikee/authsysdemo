"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

// Type definitions
interface UserData {
  unique_id: string;
  is_confirmed: boolean;
  is_active: boolean;
  full_name: string;
  email: string;
  phone: string;
}

interface StatusBadgeProps {
  isActive: boolean;
  label: string;
}

interface RetryButtonProps {
  onClick: () => void;
}

interface ApiError {
  message?: string;
}

const UserProfileComponent: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchparam = useSearchParams();
  const user_id = searchparam.get("id");
  const fetchUserData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<UserData>(
        `https://www.bytealpha.online/api/v1/auth/users/${user_id}`
        // `http://13.53.36.102/api/v1/auth/users/${user_id}`
        // `https://authsysbackend-cfqp.onrender.com/api/v1/auth/users/${user_id}`
        // `https://authsysbackend-cfqp.onrender.com/api/v1/auth/users/${user_id}`
        // `http://127.0.0.1:8000/api/v1/auth/users/${user_id}`
      );
      console.log(response);
      setUserData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to fetch user data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user_id && fetchUserData();
  }, []);

  const formatName = (name: string): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive, label }) => (
    <span
      className={`inline-block px-3 py-1 text-white rounded-full text-xs font-semibold uppercase tracking-wider ${
        isActive ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {label}
    </span>
  );

  const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  const RetryButton: React.FC<RetryButtonProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Try Again
    </button>
  );

  const handleRetry = (): void => {
    fetchUserData();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-5 font-sans">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-8 text-white text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white bg-opacity-30 rounded-lg mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded-lg w-32 mx-auto"></div>
            </div>
          </div>

          <div className="px-6 py-6 border-b border-gray-200 flex gap-3 justify-center">
            <div className="animate-pulse flex gap-3">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>

          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded-lg w-48 mb-5"></div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-5 font-sans">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span
                className="text-red-600 text-2xl"
                role="img"
                aria-label="Warning"
              >
                ⚠️
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <RetryButton onClick={handleRetry} />
          </div>
        </div>
      </div>
    );
  }

  // Success State - Render user profile
  if (!userData) {
    return null; // This shouldn't happen, but handles the case where userData is null after loading
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">
            {formatName(userData.full_name)}
          </h1>
          <p className="text-base opacity-90">ID: {userData.unique_id}</p>
        </div>

        {/* Status Section */}
        <div className="px-6 py-6 border-b border-gray-200 flex gap-3 justify-center">
          <StatusBadge
            isActive={userData.is_confirmed}
            label={userData.is_confirmed ? "Confirmed" : "Unconfirmed"}
          />
          <StatusBadge
            isActive={userData.is_active}
            label={userData.is_active ? "Active" : "Inactive"}
          />
        </div>

        {/* Contact Information */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-5">
            Contact Information
          </h2>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white text-lg" aria-hidden="true">
                  @
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500 font-medium">
                  Email Address
                </div>
                <div className="text-base text-gray-900 font-medium break-words">
                  {userData.email}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span
                  className="text-white text-lg"
                  role="img"
                  aria-label="Phone"
                >
                  📞
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500 font-medium">
                  Phone Number
                </div>
                <div className="text-base text-gray-900 font-medium break-words">
                  {userData.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
