import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./components";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SubmitFeedbackPage = React.lazy(() =>
  import("./pages/SubmitFeedbackPage")
);
const DisplayFeedbackPage = React.lazy(() =>
  import("./pages/DisplayFeedbackPage")
);

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/submit-feedback",
      element: <ProtectedRoute element={<SubmitFeedbackPage />} />,
    },
    {
      path: "/display-feedback",
      element: <ProtectedRoute element={<DisplayFeedbackPage />} />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
