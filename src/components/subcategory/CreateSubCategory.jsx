import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getallcategory = async () => {
     
      const response = await axiosInstance.get(
        "/all-category",
       
      );
      setCategories(response.data);
    };
    getallcategory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("No file chosen");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("image", data.image[0]);
   

    try {
      const response = await axiosInstance.post(
        "/create-subcategory",
        formData
       
      );

      reset();
      setSelectedImage(null);
      navigate("/all-sub-category");
       setLoading(false)
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting subcategory:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-fuchsia-700 underline text-3xl font-bold">
          Add Sub Category
        </h1>
        <Link
          to="/all-sub-category"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          <IoArrowBack className="w-5 h-5" /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1">
              Select Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
            >
              <option value=""> Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">
              Sub Category Image
            </label>
            <div className="relative w-full">
              <input
                type="file"
                id="image"
                {...register("image", {
                  required: "Image is required",
                })}
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
              <div className="flex justify-between items-center border border-fuchsia-500 rounded-xl px-4 py-2 bg-white">
                <span className="text-gray-500 truncate">
                  {selectedFileName}
                </span>
                <span className="bg-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm">
                  Browse
                </span>
              </div>
            </div>
            {selectedImage && (
              <div className="mt-2">
                <p className="text-green-600 font-medium">
                  Image uploaded successfully!
                </p>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-32 h-auto mt-2 rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Subcategory Name */}
          <div className="mb-4">
            <label htmlFor="subcategory" className="block mb-1">
              Sub Category Name
            </label>
            <input
              type="text"
              {...register("subcategory", {
                required: "Subcategory name is required",
              })}
              className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
            />
            {errors.subcategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subcategory.message}
              </p>
            )}
          </div>
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className={`mt-12 flex items-center justify-center gap-2 rounded-2xl text-white px-4 py-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-fuchsia-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <>
              <span>Creating...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            "Create Sub Category"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
