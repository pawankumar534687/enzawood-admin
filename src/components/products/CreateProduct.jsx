import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CreateProduct = () => {
  const [allsubcategory, setallsubcategory] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [variants, setVariants] = useState([{ colorName: "", images: [] }]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm();
  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    const getallcategory = async () => {
      const response = await axiosInstance.get("/all-category");
      setCategorys(response.data);
    };
    getallcategory();

    const getsubcategory = async () => {
      const response = await axiosInstance.get("/all-subcategory");
      setallsubcategory(response.data);
    };
    getsubcategory();
  }, []);

  useEffect(() => {
    if (price && discount >= 0) {
      const discountedPrice = price - (price * discount) / 100;
      setValue("finalprice", Math.round(discountedPrice));
    }
  }, [price, discount, setValue]);

  const handleVariantChange = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  const handleVariantImages = (index, files) => {
    const updated = [...variants];
    const previews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    updated[index].images = previews;
    setVariants(updated);
  };

  const addVariant = () =>
    setVariants([...variants, { colorName: "", images: [] }]);
  const removeVariant = (index) =>
    setVariants(variants.filter((_, i) => i !== index));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      for (let key in data) {
        if (key !== "images") formData.append(key, data[key]);
      }

      // Append variants JSON
      formData.append(
        "variants",
        JSON.stringify(variants.map((v) => ({ colorName: v.colorName })))
      );

      // Append variant images
      variants.forEach((variant) => {
        if (!variant.colorName) return;
        variant.images.forEach((img) => {
          formData.append(`variant_${variant.colorName}`, img.file);
        });
      });

      const res = await axiosInstance.post("/create-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      setVariants([{ colorName: "", images: [] }]);
      toast.success("Product created successfully!");
      navigate("/all-products");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-2">
        <h1 className="text-3xl underline font-bold text-fuchsia-700">
          Create Product
        </h1>
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
      >
        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700">
            Select Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          >
            <option value="">Select Category</option>
            {categorys.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Subcategory */}
        <div>
          <label className="block font-medium text-gray-700">
            Select Sub Category
          </label>
          <select
            {...register("subCategory", {
              required: "Sub Category is required",
            })}
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          >
            <option value="">Select Sub Category</option>
            {allsubcategory.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.subcategory}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="text-red-600">{errors.subCategory.message}</p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("productName", { required: true })}
            placeholder="Product Name"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
          {errors.productName && (
            <p className="text-red-600">Product name is required</p>
          )}
        </div>

        {/* Product Description & Info */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
          {errors.description && (
            <p className="text-red-600">Description is required</p>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Product Information
          </label>
          <textarea
            {...register("productinformation", { required: true })}
            placeholder="Product Information"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
          {errors.productinformation && (
            <p className="text-red-600">Product Information is required</p>
          )}
        </div>

        {/* Other fields */}
        <div>
          <label className="block font-medium text-gray-700">Material</label>
          <input
            {...register("material")}
            placeholder="Material"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Seating Capacity
          </label>
          <input
            {...register("seatingCapacity")}
            placeholder="Seating Capacity"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Size</label>
          <input
            {...register("size")}
            placeholder="Size"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Brand</label>
          <input
            {...register("brand")}
            placeholder="Brand"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Style</label>
          <input
            {...register("style")}
            placeholder="Style"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price</label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Price"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
          {errors.price && <p className="text-red-600">Price is required</p>}
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            {...register("discount")}
            type="number"
            placeholder="Discount (%)"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Final Price</label>
          <input
            {...register("finalprice")}
            readOnly
            placeholder="Final Price"
            className="border-fuchsia-500 border px-4 py-2 rounded-xl w-full"
          />
        </div>

        {/* Variants Section */}
        <div className="col-span-full border p-4 rounded-xl border-fuchsia-300">
          <h2 className="text-lg font-semibold mb-2">
            Variants (Colors & Images)
          </h2>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="mb-4 border p-2 rounded-xl border-gray-300"
            >
              <input
                type="text"
                placeholder="Color Name"
                value={variant.colorName}
                onChange={(e) =>
                  handleVariantChange(index, "colorName", e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
                required
              />
              <input
                type="file"
                multiple
                onChange={(e) => handleVariantImages(index, e.target.files)}
                className="mb-2"
                required
              />
              <div className="flex gap-2">
                {variant.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    className="w-16 h-16 object-cover border rounded"
                    alt="preview"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove Variant
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-fuchsia-700 w-full h-12 mt-4 text-white rounded hover:bg-fuchsia-800 flex items-center justify-center gap-2"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
