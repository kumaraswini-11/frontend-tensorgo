import React from "react";

const FeedbackForm = ({
  formData,
  error,
  handleChange,
  handleSubmit,
  loading,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md max-w-5xl mx-auto mt-20"
      aria-readonly={loading}
      aria-busy={loading}
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-orange-800"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-orange-800"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          rows="4"
          required
        />
      </div>
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-orange-800"
        >
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition duration-300 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
