import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attrInput, setAttrInput] = useState("");
  const [filterAttributes, setFilterAttributes] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Fetch category data on load
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`/edit-category-form/${id}`);
        const data = res.data;

        reset({ category: data.category });
        setFilterAttributes(data.filterAttributes || []);
        setPreview(data.image?.url || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load category data");
      }
    };
    fetchCategory();
  }, [id, reset]);

 
  const handleAddAttribute = () => {
    if (attrInput.trim() !== "" && !filterAttributes.includes(attrInput)) {
      setFilterAttributes([...filterAttributes, attrInput.trim()]);
      setAttrInput("");
    }
  };

 
  const handleRemoveAttribute = (attr) => {
    setFilterAttributes(filterAttributes.filter((a) => a !== attr));
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

 
  const onSubmit = async (data) => {
    try {
      
      const formData = new FormData();

      formData.append("category", data.category);
      formData.append("filterAttributes", JSON.stringify(filterAttributes));

      
      if (image) {
        formData.append("image", image);
      }

      const res = await axiosInstance.put(
        `/editcategory/${id}`,
        formData,
        
      );

      toast.success(res.data.message || "Category updated successfully");
      navigate("/all-category");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pb-6 text-fuchsia-700 underline">
          Edit Category
        </h1>
        <Link
          to="/all-category"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* ✅ Category Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
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

            {/* ✅ Filter Attributes */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Attributes
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Filter Attribute"
                  value={attrInput}
                  onChange={(e) => setAttrInput(e.target.value)}
                  className="flex-1 p-2 border-fuchsia-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <button
                  type="button"
                  onClick={handleAddAttribute}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>

              {/* ✅ Attribute Chips with Remove Option */}
              <div className="mt-2 flex flex-wrap gap-2">
                {filterAttributes.map((attr, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-2"
                  >
                    {attr}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttribute(attr)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ✅ Image Upload */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="w-full h-40 border-2 border-fuchsia-400 rounded-lg flex items-center justify-center overflow-hidden bg-fuchsia-50 relative">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <label className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs cursor-pointer">
                      Change
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </>
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
            className="mt-6 hover:bg-blue-700 bg-fuchsia-700 text-white p-2 rounded-2xl w-full sm:w-auto"
            type="submit"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
