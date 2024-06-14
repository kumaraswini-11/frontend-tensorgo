import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Header, FeedbackForm, FrillWidget } from "../components";

const SubmitFeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    rating: 1,
    comment: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.category === "" || formData.comment === "") {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback/`,
        formData
      );
      resetForm();
      response.status >= 200 &&
        response.status < 400 &&
        toast.success(response.data.message);
    } catch (error) {
      setError("Failed to submit feedback. Please try again.");
      console.error("Feedback submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      category: "",
      rating: 1,
      comment: "",
    });
  };

  return (
    <>
      <Header />
      <main className="mt-20 p-4">
        <FeedbackForm
          formData={formData}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
       
        <FrillWidget />
      </main>
    </>
  );
};

export default SubmitFeedbackPage;
