import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const GoogleLoginButton = ({ onLogin, setUserData }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { login } = useAuth();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(`${backendUrl}/api/auth/google`, {
          code: codeResponse.code,
        });

        login(response.data.data);
        onLogin();
      } catch (error) {
        console.error("Failed to exchange code for tokens:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Error:", errorResponse);
    },
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition duration-300"
    >
      Login with Google 🚀
    </button>
  );
};

export default GoogleLoginButton;
