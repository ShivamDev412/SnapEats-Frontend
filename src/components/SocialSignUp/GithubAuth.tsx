import React from "react";
import { FaGithub } from "react-icons/fa";

const GitHubAuth: React.FC = () => {
  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/github`;
  };

  return (
    <button
      className="bg-gray-800 text-white p-2 rounded-lg w-8/12 font-semibold hover:opacity-90 flex gap-2 items-center justify-center"
      onClick={handleGitHubLogin}
    >
      <FaGithub />
      Login with GitHub
    </button>
  );
};

export default GitHubAuth;
