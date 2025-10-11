import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
const EditProducts = () => {
  const [allsubcategory, setAllSubcategory] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [product, setProduct] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
   const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    if (price && discount >= 0) {
      const discountedPrice = price - (price * discount) / 100;
      setValue("finalprice", discountedPrice.toFixed(2));
    }
  }, [price, discount, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
     
      const res = await axiosInstance.get("/all-category"
        
      );
      setCategorys(res.data);
    };
    const fetchSubCategories = async () => {
     
      const res = await axiosInstance.get(
        "/all-subcategory",
       
      );
      setAllSubcategory(res.data);
    };
    fetchCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      
      const res = await axiosInstance.get(
        `/edit-product-data/${id}`,
        
      );
      setProduct(res.data);
      setValue("productName", res.data.productName);
      setValue("description", res.data.description);
      setValue("material", res.data.material);
      setValue("color", res.data.color);
      setValue("seatingCapacity", res.data.seatingCapacity);
      setValue("size", res.data.size);
      setValue("brand", res.data.brand);
      setValue("price", res.data.price);
      setValue("style", res.data.style);
      setValue("category", res.data.category);
      setValue("subCategory", res.data.subCategory);
      setValue("price", res.data.price);
      setValue("discount", res.data.discount || 0);
      setValue("finalprice", res.data.finalprice);
      setPreviewImages(res.data.images || []);
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const formData = new FormData();

      for (let key in data) {
        if (key !== "images") {
          formData.append(key, data[key]);
        }
      }

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      previewImages.forEach((img) => {
        formData.append("oldImages[]", JSON.stringify(img));
      });
     
      await axiosInstance.put(
        `/edit-product/${id}`,

        formData,
        
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate("/all-products");
       setLoading(false)
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
      setLoading(false)
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      local: true,
    }));

    setPreviewImages(previews);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-2">
        <h1 className="text-3xl underline font-bold text-fuchsia-700">
          Edit Product
        </h1>
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
        encType="multipart/form-data"
      >
        <div>
          <label className="font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          >
            <option value="">Select Category</option>
            {categorys.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Sub Category</label>
          <select
            {...register("subCategory", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          >
            <option value="">Select Sub Category</option>
            {allsubcategory.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.subcategory}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Product Name</label>
          <input
            {...register("productName", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          />
          {errors.productName && <p className="text-red-600">Required</p>}
        </div>

        <div>
          <label className="font-medium text-gray-700">Description</label>
          <input
            {...register("description", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          />
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Material</label>
          <input
            {...register("material")}
            placeholder="Material"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
         
        </div>

        <div>
          <label className="block  font-medium text-gray-700">Color</label>
          <input
            {...register("color")}
            placeholder="Color"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
         
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Seating Capacity</label>
          <input
            {...register("seatingCapacity", { required: true })}
            placeholder="Seating Capacity"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
         
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Size</label>
          <input
            {...register("size", { required: true })}
            placeholder="Size"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
         
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Brand</label>
          <input
            {...register("brand", { required: true })}
            placeholder="Brand"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
          
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Style</label>
          <input
            {...register("style", { required: true })}
            placeholder="Style"
            className="border-fuchsia-500 border px-4 py-2 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-xl w-full"
          />
         
        </div>

        <div>
          <label className="font-medium text-gray-700">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            {...register("discount")}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Final Price</label>
          <input
            readOnly
            {...register("finalprice", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          />
        </div>
        <div>
          <label className="font-medium text-gray-700">Product Images</label>
          <div className="border-dashed border-2 border-fuchsia-500 rounded-xl p-4 text-center">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="images"
            />
            <label htmlFor="images" className="cursor-pointer">
              📁 Click to upload images
            </label>
            <p className="text-sm text-gray-500">Multiple files allowed</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img.local ? img.url : img.url || img}
                alt="preview"
                className="w-16 h-16 object-cover border border-fuchsia-300 rounded"
              />
            ))}
          </div>
        </div>

       <button
          type="submit"
          disabled={loading}
          className={`bg-fuchsia-700 w-50 h-12 mt-8  text-white px-4 py-2 rounded hover:bg-fuchsia-800 flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <span>Updating...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
