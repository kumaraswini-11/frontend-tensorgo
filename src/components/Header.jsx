import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user: userData, logout } = useAuth();

  const onLogout = () => {
    logout();
    toast.success("Successfully logged out!");
  };

  return (
    <header className="h-16 w-full fixed top-0 bg-orange-100 flex justify-between items-center p-4 shadow-md">
      <div className="text-2xl font-semibold text-orange-800">
        Customer Feedback Platform
      </div>
      <div className="flex gap-4 items-center">
        <nav className="space-x-3">
          <Link to="/submit-feedback" className="hover:underline">
            Submit Feedback
          </Link>
          <Link to="/display-feedback" className="hover:underline">
            Show Feedback
          </Link>
        </nav>

        {userData && (
          <div className="flex gap-1 items-center" title={userData.name}>
            <img
              src={userData.picture}
              alt="Logged in user"
              className="h-8 w-8 rounded-full"
            />
            <p className="text-lg font-medium text-orange-900">
              {userData.name}
            </p>
          </div>
        )}
        <LogoutButton onLogout={onLogout} />
      </div>
    </header>
  );
};

const LogoutButton = ({ onLogout }) => (
  <button
    className="text-red-600 hover:text-red-800 hover:bg-orange-300 p-2 rounded-md"
    onClick={onLogout}
  >
    Logout
  </button>
);

export default Header;
