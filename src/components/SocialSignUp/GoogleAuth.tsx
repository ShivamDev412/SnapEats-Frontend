import { API_VERSION } from "@/utils/Endpoints";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/api${API_VERSION}/auth/google`;
  };

  return (
    <button
      className="bg-red-700 text-white p-2 rounded-lg w-8/12 font-semibold hover:opacity-90 flex gap-2 items-center justify-center"
      onClick={handleGoogleLogin}
    >
      <FaGoogle />
      Login with Google
    </button>
  );
};

export default GoogleAuth;
