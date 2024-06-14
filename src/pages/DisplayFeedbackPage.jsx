import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, FeedbackChart } from "../components";

const DisplayFeedbackPage = () => {
  const [category, setCategory] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/feedback?category=${category}`
        );
        setFeedbackList(response.data.data);
      } catch (error) {
        setError("Failed to fetch feedback data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, [category]);

  return (
    <>
      <Header />
      <main className="mt-16 p-4">
        <div className="mt-6 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-orange-800">
            Feedback Summary
          </h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <>
              {!category && (
                <div className="w-full h-72 mb-6">
                  <FeedbackChart feedbackList={feedbackList} />
                </div>
              )}
              <SelectCategory category={category} setCategory={setCategory} />
              <FeedbackDetails
                feedbackList={feedbackList}
                selectedCategory={category}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};

const SelectCategory = ({ category, setCategory }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      {/* <label className="text-md font-medium text-orange-800 mb-1">
        Category
      </label> */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-1 w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      >
        <option value="">Select Category</option>
        {["Product Features", "Product Pricing", "Product Usability"].map(
          (item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          )
        )}
      </select>
    </div>
  );
};

const FeedbackDetails = ({ feedbackList, length = 5, selectedCategory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feedbackList.map((item, index) => (
        <div
          className="bg-orange-100 rounded-md p-4 shadow-md flex flex-col"
          key={index}
        >
          {!selectedCategory && (
            <div className="flex items-center mb-2 gap-1">
              <span className="font-medium text-gray-700">Category:</span>
              <p className="text-gray-600 break-words">{item.category}</p>
            </div>
          )}
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-700">Rating:</span>
            <div className="ml-2 flex">
              {Array.from({ length: length }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < item.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.472a1 1 0 00-.364 1.118l1.287 3.964c.3.921-.755 1.688-1.538 1.118L10 13.18l-3.406 2.472c-.783.57-1.838-.197-1.538-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.573 9.391c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.286-3.964z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex gap-1 items-start overflow-hidden text-pretty">
            {/* <span className="font-medium text-gray-700">Comment:</span> */}
            <p className="text-gray-600 break-words">{item.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayFeedbackPage;
