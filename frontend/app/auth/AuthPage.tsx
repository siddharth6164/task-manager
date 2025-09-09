"use client";

import { useState } from "react";
import { LoginForm } from "../../components/login-form";
import SignupFormDemo from "../../components/signup-form";

type AuthPageProps = {
  onClose: () => void;
};

export default function AuthPage({ onClose }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 dark:bg-black/40">
      <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          ✕
        </button>

        {/* Conditionally render Login or Signup */}
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupFormDemo onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}
