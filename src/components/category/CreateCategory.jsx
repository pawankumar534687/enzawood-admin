import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axiosInstance from "../utils/axiosInstance";
const CreateCategory = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();

 
  const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
     setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", data.category);
     
      if (image) formData.append("image", image);
      const response = await axiosInstance.post(
        "/create-category",
        formData
      );
      reset();
     
      if (image) URL.revokeObjectURL(image);
      setImage(null);
      navigate("/all-category");
       setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-6 items-start sm:items-center">
        <h1 className="text-fuchsia-700 underline text-3xl font-bold mb-4 sm:mb-0">
          Add Category
        </h1>
        <Link
          to="/all-category"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          <IoArrowBack className="w-5 h-5" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>

            <input
              id="category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className="p-2 w-full border-fuchsia-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

         

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="w-full h-40 border-2 border-fuchsia-400 rounded-lg flex items-center justify-center overflow-hidden bg-fuchsia-50">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <span className="text-gray-500">Click to upload</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <button
         className={`bg-fuchsia-700  text-white px-4 py-2 rounded hover:bg-fuchsia-800 flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
           disabled={loading}
        >
         {loading ? (
            <>
              <span>Creating...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
