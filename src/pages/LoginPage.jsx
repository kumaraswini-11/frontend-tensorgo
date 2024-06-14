import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLoginButton } from "../components";

const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    toast.success("Successfully logged in!");
    navigate("/submit-feedback");
  };

  return (
    <section className="max-w-xl p-8 mx-auto bg-orange-100 rounded-md mt-20 shadow-lg">
      <p className="text-lg mb-4 text-center text-orange-800">
        Please login to access the app. Currently, only Google login is
        supported.
      </p>
      <div className="flex justify-center">
        <GoogleLoginButton onLogin={onLogin} />
      </div>
    </section>
  );
};

export default LoginPage;
